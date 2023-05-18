import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const SkeletonTableRecipeNonApproved = () => {
  const items = Array.from({ length: 5 }, (v, i) => i);

  const bodyTemplate = () => {
    return <Skeleton></Skeleton>;
  };

  return (
    <>
      <DataTable value={items} className='p-datatable-striped'>
        <Column
          field='code'
          header='Image'
          style={{ width: '25%' }}
          body={bodyTemplate}
        ></Column>
        <Column
          field='name'
          header='Name'
          style={{ width: '25%' }}
          body={bodyTemplate}
        ></Column>
        <Column
          field='category'
          header='Calories'
          style={{ width: '25%' }}
          body={bodyTemplate}
        ></Column>
        <Column
          field='quantity'
          header='Carbs'
          style={{ width: '25%' }}
          body={bodyTemplate}
        ></Column>
        <Column
          field='quantity'
          header='Protein'
          style={{ width: '25%' }}
          body={bodyTemplate}
        ></Column>
        <Column
          field='quantity'
          header='Fat'
          style={{ width: '25%' }}
          body={bodyTemplate}
        ></Column>
        <Column
          field='quantity'
          header='Total Time'
          style={{ width: '25%' }}
          body={bodyTemplate}
        ></Column>
        <Column
          field='quantity'
          header='Approval'
          style={{ width: '25%' }}
          body={bodyTemplate}
        ></Column>
      </DataTable>
    </>
  );
};

export default SkeletonTableRecipeNonApproved;
