#
# Creates a container registry on Azure so that I can publish my Docker images.
#
resource "azurerm_container_registry" "container_registry" {  // cloud resource used
  name                = "edutubetf" // unique
  resource_group_name = azurerm_resource_group.edutube.name // link to resource grp
  location            = "westeurope"
  admin_enabled       = true
  sku                 = "Basic" // auto storage (cheaper)
}

// custom outputs when invoking `apply` command
output "registry_hostname" {
  value = azurerm_container_registry.container_registry.login_server
}

output "registry_un" {
  value = azurerm_container_registry.container_registry.admin_username
}

output "registry_pw" {  # SHOULD BE REMOVED IN PRODUCTION
  value = azurerm_container_registry.container_registry.admin_password
  sensitive = true
}
