---
title: "Dependency Management Metrics Maven Plugin"
home_summary: "Maven plugin that computes module stability, abstraction, and distance metrics and fails CI builds on architecture threshold violations."
home_technologies: ["Java", "Maven", "Static Analysis"]
category: "open-source"
personal_project_order: 4
description: "Maven plugin enforcing multi-module Java architecture thresholds via stability, abstraction, and distance-from-main-sequence metrics"
excerpt: "Maven plugin that calculates Robert C. Martin's stability, abstraction, and distance metrics across multi-module Java builds and can fail CI builds on architectural violations."
technologies: ["Java", "Maven"]
github: "https://github.com/ignatij/dependency-management-metrics-maven-plugin"
cv_highlights:
  - "Built a Maven plugin computing stability, abstraction, and distance-from-main-sequence metrics for multi-module Java projects with CI build-failure enforcement."
---

## Context & risk

Architectural erosion in multi-module Java codebases rarely happens in a single commit—it accumulates when dependency direction and module coupling drift faster than manual code review catches them. This plugin turns architectural coupling rules into an automated Maven build check.

## Architecture & mechanics

Computes Robert C. Martin's package/component metrics across multi-module Maven builds during the `verify` phase (configurable to `compile` or `test`):

- **Stability (`S`):** `Ce / (Ce + Ca)` — ratio of efferent (outgoing) to total dependencies.
- **Abstraction (`A`):** `Na / Nc` — ratio of abstract classes and interfaces to total classes.
- **Distance from Main Sequence (`D`):** `|A + S - 1| / √2` — flags modules drifting into the *Zone of Pain* (rigid, heavily depended-on concrete modules) or *Zone of Uselessness* (unused abstractions).
- **CI enforcement:** Supports a `report` goal for visibility and a `check` goal with `<failOnViolation>true</failOnViolation>` to fail builds automatically when thresholds are breached.

## Example Configuration

```xml
<plugin>
  <groupId>com.github.ignatij</groupId>
  <artifactId>dependency-management-metrics-maven-plugin</artifactId>
  <version>1.0.17</version>
  <configuration>
    <failOnViolation>true</failOnViolation>
  </configuration>
  <inherited>false</inherited>
  <executions>
    <execution>
      <phase>verify</phase>
      <goals>
        <goal>check</goal>
      </goals>
    </execution>
  </executions>
</plugin>
```

## Related Write-up & Repository

- [Using metrics for crafting maintainable solutions on the long run — the Maven way](https://medium.com/javarevisited/using-metrics-for-crafting-maintainable-solutions-on-the-long-run-the-maven-way-1a2d84508bf0)
- [View on GitHub](https://github.com/ignatij/dependency-management-metrics-maven-plugin)
