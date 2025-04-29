from annotated_types import MinLen, MaxLen

from pydantic import BaseModel

from typing import Literal, Annotated


class storage_elem(BaseModel):
    articul: str
    name: str
    unit: str
    count: int
    date: str


if __name__ == "__main__":
    pass