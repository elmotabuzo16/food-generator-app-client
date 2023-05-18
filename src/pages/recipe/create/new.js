import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from 'react-bootstrap';
import Loader from '@/components/Loader';
import FormContainer from '@/components/FormContainer';
import Link from 'next/link';
import slugify from 'slugify';
import { isAuth } from '@/actions/authActions';
import Router from 'next/router';
import Message from '@/components/Message';
import {
  createFood,
  createRecipe,
  loadAllApprovedRecipes,
} from '@/actions/recipeActions';
import fetch from 'isomorphic-fetch';
import { API } from '../../../../config';

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

const ProductCreateScreen = () => {
  const [showForm, setShowForm] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const [values, setValues] = useState({
    name: 'Testerr',
    category: 'Keto',
    type: 'Meal',
    main_image: '',
    calories: '1',
    carbs: '1',
    protein: '1',
    fat: '1',
    totalTime: '1',
    servingCount: '1',
    description: '11111',
    loading: '',
    error: '',
    success: '',
  });

  const {
    name,
    category,
    type,
    main_image,
    calories,
    carbs,
    protein,
    fat,
    totalTime,
    servingCount,
    description,
    loading,
    error,
    success,
  } = values;

  // Ingredients

  const [ingredientFields, setIngredientFields] = useState([
    { name: '', size: '', image: '' },
  ]);

  const ingredientsInputHandler = (index, event) => {
    const valueIngredients = [...ingredientFields];

    valueIngredients[index][event.target.name] = event.target.value;

    setIngredientFields(valueIngredients);
  };

  const addIngredientFields = () => {
    setIngredientFields([
      ...ingredientFields,
      { name: '', size: '', image: '' },
    ]);
  };

  // Servings

  const [servingFields, setServingFields] = useState([{ name: '', size: '' }]);

  const servingsInputHandler = (index, event) => {
    const valueServings = [...servingFields];

    valueServings[index][event.target.name] = event.target.value;

    setServingFields(valueServings);
  };

  const addServingFields = () => {
    setServingFields([...servingFields, { name: '', size: '' }]);
  };

  // Directions / steps

  const [directionFields, setDirectionFields] = useState([
    { description: '', image: '' },
  ]);

  const directionInputHandler = (index, event) => {
    const valueDirection = [...directionFields];

    valueDirection[index][event.target.name] = event.target.value;

    setDirectionFields(valueDirection);
  };

  const addDirectionFields = () => {
    setDirectionFields([...directionFields, { description: '', image: '' }]);
  };

  const handleInputChange = async (e) => {
    if (e.target.name === 'main_image') {
      const file = e.target.files[0];

      if (file) {
        const fileSize = file.size;
        if (fileSize > MAX_IMAGE_SIZE) {
          alert('Image size exceeds the maximum limit of 1MB');
          setSelectedImage('');
          return;
        }
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    } else {
      setValues({ ...values, [e.target.name]: e.target.value, error: '' });
    }

    console.log(values);
  };

  // const handleInputChange = (e) => {
  //   var reader = new FileReader();

  //   const value =
  //     [e.target.name] === 'main_image'
  //       ? reader.readAsDataURL(e.target.files[0])
  //       : e.target.value;

  //   reader.onload = () => {
  //     setValues({
  //       ...values,
  //       error: false,
  //       main_image: reader.result,
  //       error: '',
  //     });

  //     console.log(main_image);
  //   };

  //   reader.onerror = (error) => {
  //     console.log('Error: ', error);
  //   };

  //   setValues({
  //     ...values,
  //     error: false,
  //     [e.target.name]: value,
  //     error: '',
  //   });
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: '' });

    // const imageData = Buffer.from(main_image, 'base64');
    // console.log(imageData);

    // // Detect file type
    // const detectedFileType = await FileType.fromBuffer(imageData);
    // const contentType = detectedFileType?.mime || 'application/octet-stream';

    const foodRecipe = {
      name,
      category,
      type,
      main_image,
      calories,
      carbs,
      protein,
      fat,
      totalTime,
      servingCount,
      description,
      // ingredients: ingredientFields,
      // servings: servingFields,
      // directions: directionFields,
    };

    if (main_image.length === 0) {
      foodRecipe.main_image = selectedImage;
    }

    createFood(foodRecipe).then((data) => {
      console.log();
      if (data.error) {
        setValues({ ...values, loading: false, error: data.error });
        console.log(data.error);
      } else {
        setValues({
          ...values,
          loading: false,
          error: '',
          success: `Your recipe has been created. Please be advised that your recipe is still in approval phase. Admins will send you an email once approved. Thank you!`,
        });
        setShowForm(false);
      }
    });
  };

  const submitTestHandler = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: '' });

    let token = isAuth().token;

    const recipeData = {
      name,
      category,
      type,
      main_image,
      calories,
      carbs,
      protein,
      fat,
      totalTime,
      servingCount,
      description,
      //   ingredients: ingredientFields,
      //   servings: servingFields,
      //   directions: directionFields,
    };

    createFood(token, recipeData).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          loading: false,
          error: data.error,
          message: data.message,
        });
      } else {
        console.log('success');
      }
    });
  };

  return (
    <Container>
      <Link href='/recipes' className='btn btn-light my-3'>
        Go Back
      </Link>

      {success && <Message variant='success'>{success}</Message>}
      {error && <Message variant='danger'>{error}</Message>}

      {!isAuth() && (
        <Message variant='danger'>
          Please Login or Create an Account to proceed on creating a new
          recipes!
        </Message>
      )}

      {isAuth() && showForm && (
        <Form onSubmit={submitHandler}>
          <Row>
            <Col md={4}>
              <Form.Group controlId='recipeCategory' className='mb-3'>
                <Form.Label>Category *</Form.Label>
                <Form.Select
                  as='select'
                  value={category}
                  name='category'
                  onChange={handleInputChange}
                >
                  <option value='Meal'>Keto</option>
                  <option value='Vegan'>Vegan</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId='recipeType' className='mb-3'>
                <Form.Label>Type of Meal *</Form.Label>
                <Form.Select
                  as='select'
                  value={type}
                  name='type'
                  onChange={handleInputChange}
                >
                  <option value='Meal'>Meal</option>
                  <option value='Snack'>Side Dish/Snack</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId='recipeName' className='mb-3'>
                <Form.Label>Recipe name *</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  name='name'
                  onChange={handleInputChange}
                  required
                ></Form.Control>
              </Form.Group>

              {/* <Form.Group controlId='recipeName' recipeImage='mb-3'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  value={main_image}
                  name='main_image'
                  onChange={handleInputChange}
                  required
                ></Form.Control>
              </Form.Group> */}

              <Form.Group controlId='recipeImage' className='mb-4'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='file'
                  name='main_image'
                  accept='image/*'
                  // value={main_image}
                  onChange={handleInputChange}
                />
              </Form.Group>

              {selectedImage && (
                <>
                  <Form.Label>Image Uploaded: </Form.Label>

                  <img
                    width={200}
                    height={200}
                    src={selectedImage}
                    className='m-3'
                  />
                </>
              )}

              <Form.Group controlId='recipeCalories' className='mb-3 mt-3'>
                <Form.Label>Calories *</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter calories'
                  name='calories'
                  value={calories}
                  onChange={handleInputChange}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='recipeCarbs' className='mb-3'>
                <Form.Label>Carbs *</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter carbs'
                  name='carbs'
                  value={carbs}
                  onChange={handleInputChange}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='recipeProtein' className='mb-3'>
                <Form.Label>Protein *</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter protein'
                  name='protein'
                  value={protein}
                  onChange={handleInputChange}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='recipeFat' className='mb-3'>
                <Form.Label>Fat *</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter fat'
                  value={fat}
                  name='fat'
                  onChange={handleInputChange}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='recipeTotalTime' className='mb-3'>
                <Form.Label>Total Time *</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter total time'
                  value={totalTime}
                  name='totalTime'
                  onChange={handleInputChange}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='servingCount' className='mb-3'>
                <Form.Label>Serving Count *</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Serving Count'
                  value={servingCount}
                  name='servingCount'
                  onChange={handleInputChange}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='description' className='mb-3'>
                <Form.Label>Description *</Form.Label>
                <textarea
                  className='form-control'
                  type='textarea'
                  placeholder='Enter description'
                  value={description}
                  name='description'
                  onChange={handleInputChange}
                  required
                ></textarea>
              </Form.Group>
            </Col>

            <Col md={8}>
              <Form.Label>Ingredients</Form.Label>
              <Card className=' pb-3'>
                <Container>
                  {ingredientFields.map((ingredientField, index) => (
                    <div key={index}>
                      <Card className='mt-3 pb-3'>
                        <Container>
                          <Form.Label className='mt-2'>
                            Ingredient Name
                          </Form.Label>
                          <Form.Control
                            name='name'
                            type='text'
                            placeholder='Enter Ingredient Name'
                            value={ingredientField.name}
                            onChange={(event) =>
                              ingredientsInputHandler(index, event)
                            }
                          ></Form.Control>

                          <Form.Label className='mt-2'>
                            Ingredient Size
                          </Form.Label>
                          <Form.Control
                            name='size'
                            type='text'
                            placeholder='Enter Ingredient Size'
                            value={ingredientField.size}
                            onChange={(event) =>
                              ingredientsInputHandler(index, event)
                            }
                          ></Form.Control>

                          <Form.Label className='mt-2'>
                            Ingredient Image
                          </Form.Label>
                          <Form.Control
                            name='image'
                            type='text'
                            placeholder='Enter Ingredient Image'
                            value={ingredientField.image}
                            onChange={(event) =>
                              ingredientsInputHandler(index, event)
                            }
                          ></Form.Control>
                        </Container>
                      </Card>
                    </div>
                  ))}

                  <Button
                    className='mt-3'
                    variant='light'
                    onClick={addIngredientFields}
                  >
                    Add new ingredient
                  </Button>
                </Container>
              </Card>

              <Form.Label className='pt-3'>Servings</Form.Label>
              <Card className=' pb-3'>
                <Container>
                  {servingFields.map((servingField, index) => (
                    <div key={index}>
                      <Card className='mt-3 pb-3'>
                        <Container>
                          <Form.Label className='mt-2'>Serving Name</Form.Label>
                          <Form.Control
                            name='name'
                            type='text'
                            placeholder='Enter Serving Name'
                            value={servingField.name}
                            onChange={(event) =>
                              servingsInputHandler(index, event)
                            }
                          ></Form.Control>

                          <Form.Label className='mt-2'>Serving Size</Form.Label>
                          <Form.Control
                            name='size'
                            type='text'
                            placeholder='Enter Serving Size'
                            value={servingField.size}
                            onChange={(event) =>
                              servingsInputHandler(index, event)
                            }
                          ></Form.Control>
                        </Container>
                      </Card>
                    </div>
                  ))}

                  <Button
                    className='mt-3'
                    variant='light'
                    onClick={addServingFields}
                  >
                    Add new serving
                  </Button>
                </Container>
              </Card>

              <Form.Label className='pt-3'>Directions</Form.Label>
              <Card className=' pb-3'>
                <Container>
                  {directionFields.map((directionField, index) => (
                    <div key={index}>
                      <Card className='mt-3 pb-3'>
                        <Container>
                          <Form.Label className='mt-2'>Description</Form.Label>
                          <textarea
                            className='form-control'
                            name='description'
                            type='text'
                            placeholder='Enter description'
                            value={directionField.description}
                            onChange={(event) =>
                              directionInputHandler(index, event)
                            }
                          ></textarea>

                          <Form.Label className='mt-2'>Image</Form.Label>
                          <Form.Control
                            name='image'
                            type='text'
                            placeholder='Enter Ingredient Size'
                            value={directionField.image}
                            onChange={(event) =>
                              directionInputHandler(index, event)
                            }
                          ></Form.Control>
                        </Container>
                      </Card>
                    </div>
                  ))}

                  <Button
                    className='mt-3'
                    variant='light'
                    onClick={addDirectionFields}
                  >
                    Add new directions
                  </Button>
                </Container>
              </Card>
            </Col>
          </Row>

          {loading ? (
            <Button
              variant='primary'
              type='submit'
              className='mb-4'
              style={{ width: '200px' }}
              disabled
            >
              <span>Creating recipe...</span>
              <span style={{ paddingLeft: '10px' }}>
                <Spinner animation='border' size='sm'></Spinner>
              </span>
            </Button>
          ) : (
            <Button
              variant='primary'
              type='submit'
              className='mb-4'
              style={{ width: '200px' }}
            >
              <span>Create Recipe</span>
            </Button>
          )}

          {error && <Message variant='danger'>{error}</Message>}
        </Form>
      )}
    </Container>
  );
};

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
export default ProductCreateScreen;
