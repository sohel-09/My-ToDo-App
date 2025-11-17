variable "project_id" {}
variable "region" { default = "asia-south1" }
variable "zone" { default = "asia-south1-a" }

variable "gcp_credentials" {
  type = string
  description = "Base64 encoded service account key"
}


