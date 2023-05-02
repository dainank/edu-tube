#
# Creates a resource group automatically for edutube in my Azure account.
#
resource "azurerm_resource_group" "edutube" { // resource grp
  name     = "edutube"
  location = "westeurope"
}
