# GKE Cluster Name
output "cluster_name" {
  description = "The name of the GKE cluster created for ToDo App"
  value       = google_container_cluster.todo_cluster.name
}

# Backend LoadBalancer Static IP
output "backend_ip" {
  description = "Reserved static external IP address for the backend service"
  value       = google_compute_address.backend_static_ip.address
}

# Frontend LoadBalancer Static IP
output "frontend_ip" {
  description = "Reserved static external IP address for the frontend service"
  value       = google_compute_address.frontend_static_ip.address
}

# Artifact Registry Repository (optional)
output "artifact_repo_name" {
  description = "Artifact Registry repository name for Docker images"
  value       = google_artifact_registry_repository.todo_repo.repository_id
}
