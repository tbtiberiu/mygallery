terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }

  cloud {
    organization = "tbtiberiu"

    workspaces {
      name = "mygallery"
    }
  }
}

provider "azurerm" {
  features {}
}

# Create a virtual machine
resource "azurerm_resource_group" "mygallery" {
  name     = "mygallery-resources"
  location = "West Europe"
}

resource "azurerm_virtual_network" "mygallery" {
  name                = "mygallery-network"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.mygallery.location
  resource_group_name = azurerm_resource_group.mygallery.name
}

resource "azurerm_subnet" "mygallery" {
  name                 = "internal"
  resource_group_name  = azurerm_resource_group.mygallery.name
  virtual_network_name = azurerm_virtual_network.mygallery.name
  address_prefixes     = ["10.0.2.0/24"]
}

resource "azurerm_network_interface" "mygallery" {
  name                = "mygallery-nic"
  location            = azurerm_resource_group.mygallery.location
  resource_group_name = azurerm_resource_group.mygallery.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.mygallery.id
    private_ip_address_allocation = "Dynamic"
  }
}

resource "tls_private_key" "simple_ssh" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "azurerm_linux_virtual_machine" "mygallery" {
  name                = "mygallery-machine"
  resource_group_name = azurerm_resource_group.mygallery.name
  location            = azurerm_resource_group.mygallery.location
  size                = "Standard_B1ls"
  admin_username      = "adminuser"
  network_interface_ids = [
    azurerm_network_interface.mygallery.id,
  ]

  admin_ssh_key {
    username   = "adminuser"
    public_key = tls_private_key.simple_ssh.public_key_openssh
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }
}
