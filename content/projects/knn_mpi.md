---
title: "KNN MPI"
description: "Parallel implementation of k-Nearest Neighbors algorithm using MPI for high-performance computing"
excerpt: "A high-performance parallel implementation of kNN algorithm using MPI with multiple optimization strategies and performance comparisons"
technologies: ["C++", "MPI"]
github: "https://github.com/ignatij/knn-mpi"
---

# KNN MPI - Parallel k-Nearest Neighbors Implementation

A high-performance parallel implementation of the k-Nearest Neighbors (kNN) algorithm using Message Passing Interface (MPI), featuring multiple optimization strategies and comprehensive performance analysis.

## Overview

KNN MPI provides three different implementations of the k-Nearest Neighbors algorithm: a serial version for baseline comparison, and two parallel versions using MPI for distributed computing. The project demonstrates different parallelization strategies and their performance characteristics on large-scale datasets.

## Key Features

- **Multiple Implementation Strategies**: Serial, MPI Version 1, and MPI Version 2
- **High-Performance Computing**: Leverages MPI for distributed parallel processing
- **Large Dataset Support**: Optimized for datasets with 245,057+ instances
- **Performance Analysis**: Comprehensive benchmarking and comparison tools
- **Scalable Architecture**: Supports variable number of processors
- **Real-world Dataset**: Uses UCI Skin Segmentation dataset for validation
- **C++11 Implementation**: Modern C++ features for optimal performance

## Technical Architecture

### Implementation Versions

#### Serial Version (C++)

- **Purpose**: Baseline implementation for performance comparison
- **Use Case**: Single-threaded execution on one processor
- **Performance**: Reference point for parallel speedup calculations

#### MPI Version 1 (C++ + MPI)

- **Strategy**: One processor per test instance
- **Architecture**: Each processor handles one testing instance independently
- **Advantage**: Higher efficiency for large test sets
- **Best For**: Scenarios with many test instances

#### MPI Version 2 (C++ + MPI)

- **Strategy**: Distributed training set across processors
- **Architecture**: Training set split equally among processors
- **Workflow**: Each processor processes its portion, master aggregates results
- **Best For**: Large training sets with fewer test instances

## Implementation Highlights

### Compilation and Execution

```bash
# Compile the MPI version
mpicxx -o knn_mpi main.cpp -std=c++11

# Run with specified number of processors
mpirun -np 100 knn_mpi
```

### Dataset Information

- **Training Set**: [UCI Skin Segmentation Dataset](https://archive.ics.uci.edu/ml/datasets/Skin+Segmentation)
- **Training Instances**: 245,057 instances
- **Test Set**: 100 randomly generated instances
- **Features**: RGB color values for skin/non-skin classification

### Performance Characteristics

#### Version 1 (One Processor Per Test Instance)

- **Efficiency**: Higher efficiency than Version 2
- **Scalability**: Scales with number of test instances
- **Memory**: Each processor loads full training set
- **Communication**: Minimal inter-processor communication

#### Version 2 (Distributed Training Set)

- **Memory Efficiency**: Training set distributed across processors
- **Communication**: Master processor aggregates results
- **Scalability**: Scales with number of processors
- **Best For**: Memory-constrained environments

## Development & Deployment

### Prerequisites

- **MPI Implementation**: OpenMPI or MPICH
- **C++ Compiler**: GCC or Clang with C++11 support
- **Development Tools**: Make, CMake (optional)
- **Cluster Environment**: Multi-node or multi-core system

### Build Process

```bash
# Clone repository
git clone https://github.com/ignatij/knn-mpi.git
cd knn-mpi

# Compile serial version
g++ -o knn_serial serial_version/main.cpp -std=c++11

# Compile MPI versions
mpicxx -o knn_mpi_v1 mpi_version_1/main.cpp -std=c++11
mpicxx -o knn_mpi_v2 mpi_version_2/main.cpp -std=c++11
```

### Execution Examples

```bash
# Run serial version
./knn_serial

# Run MPI Version 1 with 100 processors
mpirun -np 100 ./knn_mpi_v1

# Run MPI Version 2 with 8 processors
mpirun -np 8 ./knn_mpi_v2
```

## Repository

[View on GitHub](https://github.com/ignatij/knn-mpi)

- **Language**: C++ (100%)
- **Stars**: 17 stars with active community
- **Forks**: 4 forks indicating community interest
- **Pull Requests**: Active development with open PRs
- **License**: Open source project

## Related Resources

- **UCI Machine Learning Repository**: [Skin Segmentation Dataset](https://archive.ics.uci.edu/ml/datasets/Skin+Segmentation)
- **MPI Documentation**: Message Passing Interface standards
- **Parallel Computing Resources**: High-performance computing guides
- **kNN Algorithm**: Theoretical background and applications
