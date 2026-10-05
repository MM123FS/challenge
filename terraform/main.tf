terraform {
  required_version = ">= 1.5.0"
}

variable "app_name" {
  description = "Name of the application"
  type        = string
  default     = "devops-platform-challenge"
}

variable "image_tag" {
  description = "Container image tag to deploy"
  type        = string
  default     = "latest"
}

locals {
  container_image = "ghcr.io/example/${var.app_name}:${var.image_tag}"
}

output "app_name" {
  description = "Name of the application"
  value       = var.app_name
}

output "container_image" {
  description = "Container image reference that would be deployed"
  value       = local.container_image
}