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
  project     = var.project_id
  region      = var.region
  zone        = var.zone
  credentials = base64decode(var.gcp_credentials)    # CD Pipeline injects this
}

# ARTIFACT REGISTRY REPO

resource "google_artifact_registry_repository" "todo_repo" {
  repository_id = "todo-repo"
  location      = var.region
  format        = "DOCKER"
}


# GKE CLUSTER

resource "google_container_cluster" "todo_cluster" {
  name     = "todo-cluster"
  location = var.zone
  remove_default_node_pool = true
  initial_node_count       = 1

  networking_mode = "VPC_NATIVE"

  release_channel {
    channel = "REGULAR"
  }
}


# CREATE ONLY NODE POOL (optional)
#
# resource "google_container_node_pool" "todo_nodes" {
#   name       = "todo-nodes"
#   cluster    = data.google_container_cluster.todo_cluster.id
#   location   = var.zone

#   node_config {
#     machine_type = "e2-medium"
#   }

#   initial_node_count = 1
# }


