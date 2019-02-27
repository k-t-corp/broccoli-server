import logging
from abc import ABCMeta, abstractmethod
from broccoli_plugin_interface.rpc_client import RpcClient
from .metadata_store import MetadataStore


class WorkContext(metaclass=ABCMeta):
    @abstractmethod
    @property
    def metadata_store(self) -> MetadataStore:
        pass

    @abstractmethod
    @property
    def rpc_client(self) -> RpcClient:
        pass

    @abstractmethod
    @property
    def logger(self) -> logging.Logger:
        pass
