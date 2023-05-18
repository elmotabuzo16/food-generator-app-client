import Link from 'next/link';
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { Rating } from 'primereact/rating';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import Router from 'next/router';
import SkeletonTableRecipeApproved from './Skeleton/SkeletonTableRecipeApproved';

const TableRecipeApproved = ({ allRecipes, loading }) => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const imageBodyTemplate = (recipe) => {
    return (
      <img
        src={recipe.main_image}
        alt={recipe.main_image}
        style={{ maxWidth: '100%', maxHeight: '75px' }}
        className='w-6rem shadow-2 border-round'
      />
    );
  };

  const ratingBodyTemplate = (recipe) => {
    return <Rating value={recipe.rating} readOnly cancel={false} />;
  };

  const nameBodyTemplate = (recipe) => {
    return <Link href={`/recipe/${recipe.slug}`}>{recipe.name}</Link>;
  };

  const createProductHandler = (e) => {
    e.preventDefault();

    Router.replace(`/recipe/create/new`);
  };

  return (
    <>
      <div className='mt-4'>
        <InputText
          placeholder='Search Recipes'
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
          Create Recipe
        </Button>
      </div>
      {loading && (
        <>
          <SkeletonTableRecipeApproved />
        </>
      )}
      {!loading && (
        <>
          <DataTable
            value={allRecipes}
            filters={filters}
            paginator
            rows={5}
            className='mt-4'
          >
            <Column
              header='Image'
              body={imageBodyTemplate}
              className='text-center'
            ></Column>
            <Column field='type' header='Type'></Column>
            <Column
              field='name'
              header='Name'
              body={nameBodyTemplate}
              sortable
            ></Column>
            <Column field='calories' header='Calories'></Column>
            <Column field='carbs' header='Carbs'></Column>
            <Column field='protein' header='Protein'></Column>
            <Column field='fat' header='Fat'></Column>
            <Column field='totalTime' header='Total Time'></Column>
            <Column
              field='rating'
              header='Reviews'
              body={ratingBodyTemplate}
            ></Column>
          </DataTable>
        </>
      )}
    </>
  );
};

export default TableRecipeApproved;
