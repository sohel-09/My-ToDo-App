output "cluster_name" {
  value = data.google_container_cluster.todo_cluster.name
}

output "artifact_repo_name" {
  value = data.google_artifact_registry_repository.todo_repo.repository_id
}

# output "backend_static_ip" {
#   value = google_compute_address.backend_ip.address
# }