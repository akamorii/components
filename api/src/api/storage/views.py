import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from typing import Annotated
from storage.schemas import storage_elem

from fastapi import Path, APIRouter

from storage import crud

router = APIRouter(prefix='/storage', tags=['storage'])


@router.post('/add_storage_element')
def add_elem_to_storage(new_elem: storage_elem):
        return {
            'result': crud.add_storage_entity(new_elem)
    }



@router.get('/get_storage_elements')
def get_storage():
    return {
       'result': crud.get_storage()
    }
    

@router.delete('/delete_storage_elem')
def delete_storage_elem(id):
    return {
            'result': crud.delete_elem(id)
        }
    
    
# @router.get('/check_url/{id}')
# def get_url_data(id):

#     return {

#     }