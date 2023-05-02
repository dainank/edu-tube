# Initialises Terraform providers and sets their version numbers (configuration with cloud).

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.29.1" // can be deleted to pickup latest version automatically
    }
  }

  required_version = ">= 1.3.1"
}

provider "azurerm" {
  features {}
}
