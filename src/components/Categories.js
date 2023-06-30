import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { Button } from 'primereact/button';
import Router from 'next/router';
import { getCategories } from '@/actions/categoryActions';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    initCategories();
  }, []);

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const createProductHandler = (e) => {
    e.preventDefault();

    Router.replace(`/admin/categories/new`);
  };

  return (
    <>
      <div className='mt-4'>
        <InputText
          placeholder='Search Categories'
          onInput={(e) =>
            setFilters({
              ...filters,
              global: {
                value: e.target.value,
                matchMode: FilterMatchMode.CONTAINS,
              },
            })
          }
        />
        <Button style={{ float: 'right' }} onClick={createProductHandler}>
          Create Categories
        </Button>
      </div>

      <DataTable
        value={categories}
        filters={filters}
        tableStyle={{ minWidth: '50rem' }}
        className='mt-4'
      >
        <Column field='name' header='Name'></Column>
        <Column field='slug' header='Slug'></Column>
      </DataTable>
    </>
  );
};

export default Categories;
