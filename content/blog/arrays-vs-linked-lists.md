---
title: "Arrays vs Linked Lists"
date: "2025-09-06"
excerpt: "When comparing arrays and linked lists, the common wisdom is that arrays are faster to traverse. The usual explanation is spatial locality: arrays are allocated in contiguous memory, so the CPU can fetch data efficiently into cache lines. In this post we explore what would be the outcome if the nodes in the linked list are also allocated contiguously."
tags: ["performance", "data-structures", "go"]
---

When comparing arrays and linked lists, the common wisdom is that arrays are faster to traverse. The usual explanation is spatial locality: arrays are allocated in contiguous memory, so the CPU can fetch data efficiently into cache lines.

Linked lists, in contrast, store nodes scattered across memory, and traversal requires chasing pointers. But what if we force linked list nodes to be allocated contiguously? Would that close the performance gap?

At first glance, you might think so. If nodes are laid out back-to-back in memory, shouldn’t finding a concrete item in the list be **O(n)**? Well not so fast.

### Building a Contiguous Linked List in Go

First step would be building a contiguous linked list in memory. One thing to note here is that the claim "nodes are not guaranteed to be contiguous" is an overly strong statement. In practice, many nodes are often allocated by the same thread so they end up quite contiguously in memory.
We can allocate all nodes in a slice and then connect them into a list:

```go
type Node struct {
	Value int
	Next  *Node
}

func BuildContiguousList(values []int) *Node {
	nodes := make([]Node, 0, len(values))
	for i := range values {
		curr := Node{Value: values[i]}
		nodes = append(nodes, curr)
		if i != 0 {
			nodes[i-1].Next = &nodes[i]
		}
	}
	return &nodes[0]
}
```

This ensures all nodes live in the same backing array. To verify contiguity, we can print addresses:

```go
for {
	if node == nil {
		break
	}
	fmt.Printf("Node with value: %d address: %p\n", node.Value, node)
	if node.Next != nil {
		diff := uintptr(unsafe.Pointer(node.Next)) - uintptr(unsafe.Pointer(node))
		fmt.Printf("Difference between adjacent nodes = %d bytes\n", diff)
	}
	node = node.Next
}
```

Sample output:

```
Node with value: 1 address: 0x14000198040
Difference between adjacent nodes = 16 bytes
Node with value: 2 address: 0x14000198050
Difference between adjacent nodes = 16 bytes
Node with value: 3 address: 0x14000198060
```

This confirms nodes are indeed laid out sequentially.

### Benchmark: Array vs Linked List Traversal

Now let’s compare traversal performance for 100,000 elements.

Array traversal benchmark

```go
func BenchmarkArrayListTraversal(b *testing.B) {
	size := 100_000
	array := make([]int, size)
	for i := range size {
		array[i] = i
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		sum := 0
		for _, v := range array {
			sum += v
		}
	}
}
```

Linked list traversal benchmark

```go
func BenchmarkLinkedListTraversal(b *testing.B) {
	size := 100_000
	array := make([]int, size)
	for i := range size {
		array[i] = i
	}

	linkedList := BuildContiguousList(array)

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		sum := 0
		node := linkedList
		for node != nil {
			sum += node.Value
			node = node.Next
		}
	}
}
```

### Benchmark results

```
BenchmarkArrayListTraversal-11     45295   26015 ns/op   0 B/op   0 allocs/op
BenchmarkLinkedListTraversal-11    16786   67688 ns/op   0 B/op   0 allocs/op
```

Array traversal: ~45k iterations, ~26 µs each

Linked list traversal: ~17k iterations, ~67 µs each
➡️ Arrays are about **2.6×** faster to traverse.

### Why Arrays Win

Two main reasons explain this gap:

- Instruction cost: Linked list iteration requires pointer chasing, which adds extra cycles per step.

- Cache predictability: Even with contiguous nodes, the CPU struggles to prefetch effectively
  compared to a simple array scan.

### Takeaways

Arrays remain superior for traversal, even when linked list nodes are stored contiguously.

Linked lists are useful primarily when you need frequent insertions or deletions which are not at the end of the list, not for sequential iteration.

Understanding these trade-offs is critical when designing data structures in performance-sensitive code.

For the full set of benchmarks (including head and tail insertions), check the [GitHub](https://github.com/ignatij/arrays-linked-lists) repo.

### Links

- [TheCoder Cafe: Arrays vs Linked Lists](https://www.thecoder.cafe/p/arrays-vs-linked-lists)
- [CPU cache disadvantages of linked lists](https://stackoverflow.com/questions/40071635/cpu-cache-disadvantages-of-using-linked-lists-in-c/40094200#40094200)
