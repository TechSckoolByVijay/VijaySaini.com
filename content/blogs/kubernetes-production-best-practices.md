---
title: "Kubernetes Production Best Practices: Lessons from the Trenches"
date: 2026-01-05
author: Vijay Saini
tags: Kubernetes, DevOps, AKS, Production, Best Practices
---

# Kubernetes Production Best Practices: Lessons from the Trenches

After managing production Kubernetes clusters for years, I've learned valuable lessons the hard way. Here are the best practices that will save you from late-night incidents.

## Resource Management

Always set resource requests and limits:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
  - name: app
    image: myapp:latest
    resources:
      requests:
        memory: "256Mi"
        cpu: "250m"
      limits:
        memory: "512Mi"
        cpu: "500m"
```

**Why it matters**: Without resource limits, a single pod can consume all node resources, causing cascading failures.

## Health Checks

Implement proper liveness and readiness probes:

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
```

## Security Best Practices

1. **Run as non-root user**:
```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  fsGroup: 2000
```

2. **Use Pod Security Standards**: Enable restricted pod security
3. **Network Policies**: Implement network segmentation
4. **RBAC**: Follow least privilege principle
5. **Secrets Management**: Use Azure Key Vault or HashiCorp Vault

## Monitoring and Observability

Essential monitoring stack:

- **Prometheus**: Metrics collection
- **Grafana**: Visualization
- **Loki**: Log aggregation
- **Jaeger**: Distributed tracing

Key metrics to monitor:

- Pod CPU and memory usage
- Node resource utilization
- API server latency
- Etcd performance
- Network I/O

## High Availability

Ensure HA with:

1. **Multiple replicas**: At least 3 for critical services
2. **Pod Disruption Budgets**: Prevent too many simultaneous disruptions
3. **Anti-affinity rules**: Spread pods across nodes
4. **Node pools**: Separate workloads by node pools
5. **Multi-zone deployment**: Use availability zones

## Backup and Disaster Recovery

Don't learn this the hard way:

- Backup etcd regularly (automated snapshots)
- Use Velero for cluster backup
- Test restore procedures quarterly
- Document runbooks for common failures
- Maintain infrastructure as code

## Cost Optimization

Save money with:

- **Cluster autoscaler**: Scale nodes based on demand
- **Horizontal Pod Autoscaler**: Scale pods based on metrics
- **Vertical Pod Autoscaler**: Right-size pod resources
- **Spot instances**: Use for non-critical workloads
- **Resource quotas**: Prevent resource sprawl

## Deployment Strategies

Use progressive delivery:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: my-app
spec:
  replicas: 5
  strategy:
    canary:
      steps:
      - setWeight: 20
      - pause: {duration: 5m}
      - setWeight: 50
      - pause: {duration: 5m}
      - setWeight: 100
```

## Common Mistakes to Avoid

1. **Not setting resource limits**: Leads to resource exhaustion
2. **Ignoring image tags**: Always use specific versions, not `latest`
3. **No health checks**: Results in traffic to unhealthy pods
4. **Insufficient logging**: Makes debugging impossible
5. **No disaster recovery plan**: When (not if) things go wrong

## Conclusion

Running production Kubernetes is challenging but rewarding. These practices have saved me countless hours of troubleshooting and helped maintain 99.9%+ uptime.

Want to master Kubernetes? Check out my [Kubernetes Production Mastery course](../projects.html) for hands-on training.
