variable "project_id" {
    type = string
}

variable "region" { 
    type = string
    default = "asia-south1" 
}

variable "zone" {
    type = string
    default = "asia-south1-a" 
}

variable "gcp_credentials" {
  type = string
  description = "Base64 encoded service account key"
}


