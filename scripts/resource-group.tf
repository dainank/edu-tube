#
# Creates a resource group for EduTube in my Azure account.
#
resource "azurerm_resource_group" "edutube3" {
  name     = var.app_name
  location = var.location
}
