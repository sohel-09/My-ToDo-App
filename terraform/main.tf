terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  required_version = ">= 1.3.0"
}

provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
  credentials = base64decode(var.gcp_credentials)
}

# GKE Cluster
resource "google_container_cluster" "todo_cluster" {
  name     = "todo-cluster"
  location = var.zone

  remove_default_node_pool = true
  initial_node_count = 1
}

# Node pool
resource "google_container_node_pool" "todo_nodes" {
  name       = "todo-nodes"
  cluster    = google_container_cluster.todo_cluster.name
  location   = var.zone
  node_count = 2

  node_config {
    machine_type = "e2-medium"
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }
}

# Artifact Registry
resource "google_artifact_registry_repository" "todo_repo" {
  location      = var.region
  repository_id = "todo-repo"
  format        = "DOCKER"
  description   = "Repository for ToDo App images"
}

# Static IP for backend
resource "google_compute_address" "backend_static_ip" {
  name   = "backend-static-ip"
  region = var.region
}

# Static IP for frontend
resource "google_compute_address" "frontend_static_ip" {
  name   = "frontend-static-ip"
  region = var.region
}
