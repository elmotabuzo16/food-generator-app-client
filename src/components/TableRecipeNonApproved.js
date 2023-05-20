import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { isAuth } from '@/actions/authActions';
import {
  approveRecipe,
  loadAllNonApprovedRecipes,
} from '@/actions/recipeActions';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { FilterMatchMode } from 'primereact/api';
import { Tag } from 'primereact/tag';
import SkeletonTableRecipeNonApproved from './Skeleton/SkeletonTableRecipeNonApproved';
import { InputText } from 'primereact/inputtext';

const TableRecipeNonApproved = ({ username }) => {
  const [allNonApprovedRecipes, setNonApprovedRecipes] = useState([]);
  const [values, setValues] = useState({
    loading: false,
    error: '',
    success: '',
    username: '',
  });

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const { loading, error, success } = values;

  useEffect(() => {
    initNonApprovedRecipes();
  }, []);

  const initNonApprovedRecipes = () => {
    setValues({ ...values, loading: true, error: '' });

    loadAllNonApprovedRecipes(username).then((data) => {
      if (data.error) {
        setValues({ ...values, loading: false, error: data.error });
        console.log(data.error);
      } else {
        setNonApprovedRecipes(data);
        setValues({ ...values, loading: false, success: data.message });
      }
    });
  };

  const handleButtonClick = (event, slug) => {
    let token = isAuth()?.token;

    if (token) {
      approveRecipe(token, slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log('Button clicked with slug:', slug);
          initNonApprovedRecipes();
        }
      });
    }
  };

  const refreshHandler = (e) => {
    e.preventDefault();

    initNonApprovedRecipes();
  };

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

  const statusBodyTemplate = (recipe) => {
    return (
      <Tag
        value={recipe.approved ? 'Approved' : 'Not yet approved'}
        severity={getSeverity(recipe)}
      ></Tag>
    );
  };

  const approvalBodyTemplate = (recipe) => {
    return (
      <Button
        className='btn btn-primary btn-sm mt-3'
        onClick={(event) => handleButtonClick(event, recipe.slug)}
      >
        Click here to approve
      </Button>
    );
  };

  const getSeverity = (recipe) => {
    switch (recipe.approved) {
      case true:
        return 'success';

      case false:
        return 'warning';

      default:
        return null;
    }
  };
  const createProductHandler = (e) => {
    e.preventDefault();

    Router.replace(`/recipe/create/new`);
  };

  const createdAtBodyTemplate = (recipe) => {
    return moment(recipe.createdAt).fromNow();
  };

  return (
    <>
      {isAuth()?.isAdmin && (
        <div>
          <button
            className='btn btn-primary mt-3'
            onClick={refreshHandler}
            style={{ width: '20em' }}
          >
            Refresh Recipe's
          </button>
        </div>
      )}
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
      </div>{' '}
      {loading && <SkeletonTableRecipeNonApproved />}
      {!loading && (
        <DataTable
          value={allNonApprovedRecipes}
          filters={filters}
          paginator
          rows={5}
        >
          <Column
            header='Image'
            body={imageBodyTemplate}
            className='text-center'
          />
          <Column field='type' header='Type' />
          <Column field='name' header='Name' />
          <Column field='calories' header='Calories' />
          <Column field='carbs' header='Carbs' />
          <Column field='protein' header='Protein' />
          <Column field='fat' header='Fat' />
          <Column field='totalTime' header='Total Time' />
          <Column
            field='createdAt'
            header='Created At'
            body={createdAtBodyTemplate}
          />
          {!isAuth()?.isAdmin && (
            <Column
              field='approved'
              header='Approval'
              body={statusBodyTemplate}
              sortable
            />
          )}
          {isAuth()?.isAdmin && (
            <Column
              field='approved'
              header='Approval'
              body={approvalBodyTemplate}
              sortable
            />
          )}
        </DataTable>
      )}
    </>
  );
};

export default TableRecipeNonApproved;
