from dataclasses import asdict, dataclass

@dataclass
class Base:
    def __init__(self) -> None:
        pass

    def to_dict(self) -> dict:
        return asdict(self)