import Link from 'next/link';
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
// import { Rating } from 'primereact/rating';
import Rating from './Rating';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import Router from 'next/router';
import SkeletonTableRecipeApproved from './Skeleton/SkeletonTableRecipeApproved';
import { isAuth } from '@/actions/authActions';
import { favoriteRecipe } from '@/actions/recipeActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';

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

  const statusBodyTemplate = (recipe) => {
    const isFavorite = recipe.userIdFavorite.find(
      (id) => id.toString() === isAuth()?._id
    );

    return (
      <Tag
        value={isFavorite ? 'Favorited' : 'Not yet approved'}
        severity={getSeverity(recipe)}
      ></Tag>
    );
  };

  const getSeverity = (recipe) => {
    const isFavorite = recipe.userIdFavorite.find(
      (id) => id.toString() === isAuth()?._id
    );

    if (isFavorite) {
      return 'success';
    } else {
      return 'warning';
    }
  };

  const ratingBodyTemplate = (recipe) => {
    return <Rating value={recipe.rating} readOnly cancel={false} />;
  };

  const nameBodyTemplate = (recipe) => {
    return <Link href={`/recipe/${recipe.slug}`}>{recipe.name}</Link>;
  };

  const favoriteBodyTemplate = (recipe) => {
    const isFavorite = recipe.userIdFavorite.find(
      (id) => id.toString() === isAuth()?._id
    );

    const [isRed, setIsRed] = useState(isFavorite);

    const handleClick = () => {
      setIsRed(!isRed);

      let foodId = recipe._id;

      favoriteRecipe({ foodId }).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          if (isRed) {
            toast.success('Recipe has been removed to your favorites.', {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            toast.success('Recipe has been added to your favorites.', {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
      });
    };

    const heartStyle = {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: isRed ? 'red' : 'gray',
      fontSize: '30px',
    };

    return (
      <>
        {isAuth() && (
          <>
            {isFavorite ? (
              <button
                className='btn-heart'
                style={{ color: isRed ? 'red' : 'gray' }}
                id='btn1'
                onClick={handleClick}
              >
                <i className='fas fa-heart'></i>
              </button>
            ) : (
              <button
                className='btn-heart'
                style={{ color: !isRed ? 'gray' : 'red' }}
                id='btn1'
                onClick={handleClick}
              >
                <i className='fas fa-heart'></i>
              </button>
            )}
          </>
        )}
        {!isAuth() && (
          <>
            <span>Login to add favorites</span>
          </>
        )}
      </>
    );
  };

  const createProductHandler = (e) => {
    e.preventDefault();

    Router.replace(`/recipe/create/new`);
  };

  const stockBodyTemplate = (recipe) => {
    const isFavorite = recipe.userIdFavorite.find(
      (id) => id.toString() === isAuth()?._id
    );

    const heartStyle = {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: isRed ? 'red' : 'gray',
      fontSize: '30px',
    };

    const stockClassName = classNames(
      'border-circle w-2rem h-2rem inline-flex font-bold justify-content-center align-items-center text-sm',
      {
        'bg-red-100 text-red-900': isFavorite,
        'bg-teal-100 text-teal-900': !isFavorite,
      }
    );

    return <div className={stockClassName}>{recipe.userIdFavorite}</div>;
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
            <Column field='rating' header='Reviews' body={ratingBodyTemplate} />

            <Column
              field='userIdFavorite'
              header='Favorites'
              body={favoriteBodyTemplate}
            />
          </DataTable>
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default TableRecipeApproved;
