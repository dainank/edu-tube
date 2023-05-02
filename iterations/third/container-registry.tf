#
# Creates a container registry on Azure so that I can publish my Docker images.
#
resource "azurerm_container_registry" "container_registry" {  // cloud resource used
  name                = var.con_reg // unique
  resource_group_name = azurerm_resource_group.edutube.name // link to resource grp
  location            = var.location
  admin_enabled       = true
  sku                 = "Basic" // auto storage (cheaper)
}