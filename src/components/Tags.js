import { getTags } from '@/actions/tagActions';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { Button } from 'primereact/button';
import Router from 'next/router';

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    initTags();
  }, []);

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTags(data);
      }
    });
  };

  const createProductHandler = (e) => {
    e.preventDefault();

    Router.replace(`/tag/new`);
  };

  return (
    <>
      <div className='mt-4'>
        <InputText
          placeholder='Search Tags'
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
          Create Tags
        </Button>
      </div>

      <DataTable
        value={tags}
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

export default Tags;
