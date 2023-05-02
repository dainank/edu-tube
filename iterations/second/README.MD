# Example-2

This iteration uses Terraform to create a private container registery in Azure.

Run this iteration using:

```bash
cd iterations/second/scripts
terraform init
terraform apply -auto-approve
```

Destroy this iteration using:
```bash
terraform destroy
```

You can retrieve values from the output using:
```bash
terraform output -raw {registry_output}
```

or through the Azure CLI:
```bash
az acr show --name {your-container-registry-name} --output table
az acr credential show --name {your-container-registry-name} --output table
```