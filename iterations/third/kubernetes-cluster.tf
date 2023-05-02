#
# Creates a managed Kubernetes cluster on Azure.
#
resource "azurerm_kubernetes_cluster" "cluster" {
    name                = var.app_name
    location            = var.location
    resource_group_name = azurerm_resource_group.edutube.name
    dns_prefix          = var.app_name
    kubernetes_version  = var.kubernetes_version

    default_node_pool { // nodes for cluster
        name            = "default"
        node_count      = 1
        vm_size         = "Standard_B2s"
    }

    #
    # Instead of creating a service principle have the system figure this out.
    #
    identity {  // automatic assignment
        type = "SystemAssigned"
    }    
}

#
# Attaches the container registry to the cluster.
# See example here: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/container_registry#example-usage-attaching-a-container-registry-to-a-kubernetes-cluster
#
resource "azurerm_role_assignment" "role_assignment" {
  principal_id                     = azurerm_kubernetes_cluster.cluster.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"  // permission to pull registries
  scope                            = azurerm_container_registry.container_registry.id
  skip_service_principal_aad_check = true
}
