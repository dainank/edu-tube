#
# Creates a resource group for edutube in my Azure account.
#
resource "azurerm_resource_group" "edutube" {
  name     = var.app_name
  location = var.location
}