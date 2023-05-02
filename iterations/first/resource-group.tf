#
# Creates a resource group automatically for edutube in my Azure account.
#
resource "azurerm_resource_group" "edutube" {
  name     = "edutube"
  location = "westeurope"
}
