import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from 'react-bootstrap';
import Link from 'next/link';
import { isAuth } from '@/actions/authActions';
import Message from '@/components/Message';
import { createFood } from '@/actions/recipeActions';
import { API, APP_NAME, DOMAIN } from '../../../../config';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { uploadImage } from '@/actions/uploadActions';
import { getTags } from '@/actions/tagActions';

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

const ProductCreateScreen = ({ router }) => {
  const head = () => (
    <Head>
      <title> Create a new recipe | Keto Food Generator</title>
      <meta
        name='description'
        content={`${APP_NAME} - Generate delicious and healthy Filipino Keto Meals in seconds. Our keto meal planner creates personalized meal plans based on your dietary preferences and nutritional goals. Say goodbye to boring and repetitive keto meals and hello to a healthier lifestyle with our easy-to-use keto meal generator.`}
      />
      <link rel='canonical' href={`${DOMAIN}/${router.pathname}`} />
      <meta
        property='og:title'
        content={`Create a new recipe | Keto Food Generator`}
      />
      <meta
        property='og:description'
        content={`${APP_NAME} - Generate delicious and healthy Filipino Keto Meals in seconds. Our keto meal planner creates personalized meal plans based on your dietary preferences and nutritional goals. Say goodbye to boring and repetitive keto meals and hello to a healthier lifestyle with our easy-to-use keto meal generator.`}
      />
      <meta property='og:type' content='webiste' />
      <meta property='og:url' content={`${DOMAIN}/${router.pathname}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />

      <meta property='og:image' content={`${DOMAIN}/logo.png`} />
      <meta property='og:image:secure_url' content={`${DOMAIN}/logo.png`} />
      <meta property='og:image:type' content='image/png' />
    </Head>
  );

  const [showForm, setShowForm] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [values, setValues] = useState({
    name: 'test',
    category: 'Keto',
    type: '',
    main_image: '',
    calories: '325',
    carbs: '6 g',
    protein: '36 g',
    fat: '18 g',
    totalTime: '45 minutes',
    servingCount: '4',
    description: `Experience the perfect blend of keto-friendly goodness and juicy satisfaction with our Keto Juicy Pork Chop recipe. These tender, thick-cut pork chops are seasoned with a delectable combination of herbs and spices, ensuring a burst of flavor in every bite. Cooked to perfection, the succulent pork chops are seared to create a mouthwatering caramelized crust while retaining their natural juiciness. With its low-carb profile, this recipe aligns perfectly with your keto lifestyle, providing a satisfying and wholesome meal that's both delicious and nourishing. Whether you're following a ketogenic diet or simply looking for a healthy and flavorful pork chop dish, this Keto Juicy Pork Chops are sure to become a favorite on your menu`,
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
    recipeTags,
  } = values;

  // Ingredients

  const [ingredientFields, setIngredientFields] = useState([
    { name: '', size: '', image: '' },
  ]);

  const ingredientsInputHandler = async (index, event) => {
    const valueIngredients = [...ingredientFields];

    if (event.target.name === 'image') {
      const file = event.target.files[0];

      if (file) {
        const fileSize = file.size;
        if (fileSize > MAX_IMAGE_SIZE) {
          alert('Image size exceeds the maximum limit of 1MB');
          return;
        }
      }
      const url = await uploadImage(file);
      valueIngredients[index][event.target.name] = url;
    } else {
      valueIngredients[index][event.target.name] = event.target.value;
    }

    setIngredientFields(valueIngredients);
  };

  const addIngredientFields = () => {
    setIngredientFields([
      ...ingredientFields,
      { name: '', size: '', image: '' },
    ]);
  };

  const handleRemoveIngredient = (index) => {
    const updatedFields = [...ingredientFields];
    updatedFields.splice(index, 1);
    setIngredientFields(updatedFields);
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

  const handleRemoveServing = (index) => {
    const updatedFields = [...servingFields];
    updatedFields.splice(index, 1);
    setServingFields(updatedFields);
  };

  // Directions / Steps

  const [directionFields, setDirectionFields] = useState([
    { description: '', image: '' },
  ]);

  const directionInputHandler = (index, event) => {
    const valueDirection = [...directionFields];

    if (event.target.name === 'image') {
      const file = event.target.files[0];

      if (file) {
        const fileSize = file.size;
        if (fileSize > MAX_IMAGE_SIZE) {
          alert('Image size exceeds the maximum limit of 1MB');
          return;
        }
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        valueDirection[index][event.target.name] = reader.result;
      };
    } else {
      valueDirection[index][event.target.name] = event.target.value;
    }

    setDirectionFields(valueDirection);
  };

  const addDirectionFields = () => {
    setDirectionFields([...directionFields, { description: '', image: '' }]);
  };

  const handleRemoveDirection = (index) => {
    const updatedFields = [...directionFields];
    updatedFields.splice(index, 1);
    setDirectionFields(updatedFields);
  };

  // Main Code
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

      const url = await uploadImage(file);
      setSelectedImage(url);
    } else {
      setValues({ ...values, [e.target.name]: e.target.value, error: '' });
    }
  };

  // Meal Type
  const [mealType, setMealType] = useState('');

  const handleInputMealType = (e) => {
    setMealType(e.target.value);
    setValues({ ...values, type: e.target.value });
  };

  // Tags

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    initTags();
  }, [router, selectedTags]);

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTags(data);
      }
    });
  };

  const handleTagChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTags([...selectedTags, value]);
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag !== value));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: '' });

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
      ingredients: ingredientFields,
      servings: servingFields,
      directions: directionFields,
      tags: selectedTags,
    };

    if (main_image.length === 0) {
      foodRecipe.main_image = selectedImage;
    }

    createFood(foodRecipe).then((data) => {
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

  return (
    <>
      {head()}
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
                  <Form.Label>
                    <strong>Category</strong>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={'Keto'}
                    name='name'
                    onChange={handleInputChange}
                    disabled
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='formMealType' className='mb-3'>
                  <Form.Label>
                    <strong>Type of Meal</strong>
                  </Form.Label>
                  <Form.Control
                    as='select'
                    value={mealType}
                    onChange={handleInputMealType}
                  >
                    <option value=''>Select a meal type</option>
                    <option value='Meal'>Meal</option>
                    <option value='Snack'>Snack or Desserts</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId='recipeName' className='mb-3'>
                  <Form.Label>
                    <strong>Recipe name</strong>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    name='name'
                    onChange={handleInputChange}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='recipeImage' className='mb-4'>
                  <Form.Label>
                    <strong>Image</strong>
                  </Form.Label>
                  <Form.Control
                    type='file'
                    name='main_image'
                    accept='image/*'
                    onChange={handleInputChange}
                  />
                </Form.Group>
                {selectedImage && (
                  <>
                    <Form.Label>
                      <strong></strong>Image Uploaded:{' '}
                    </Form.Label>
                    <img
                      width={200}
                      height={300}
                      src={selectedImage}
                      className='m-3'
                    />
                  </>
                )}
                <Form.Group controlId='recipeCalories' className='mb-3 mt-3'>
                  <Form.Label>
                    <strong>Calories</strong>
                  </Form.Label>
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
                  <Form.Label>
                    <strong>Carbs</strong>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter carbs'
                    name='carbs'
                    value={carbs}
                    onChange={handleInputChange}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='recipeProtein' className='mb-3'>
                  <Form.Label>
                    <strong>Protein</strong>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter protein'
                    name='protein'
                    value={protein}
                    onChange={handleInputChange}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='recipeFat' className='mb-3'>
                  <Form.Label>
                    <strong>Fat</strong>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter fat'
                    value={fat}
                    name='fat'
                    onChange={handleInputChange}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='recipeTotalTime' className='mb-3'>
                  <Form.Label>
                    <strong>Total Time</strong>
                  </Form.Label>
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
                  <Form.Label>
                    <strong>Serving Count</strong>
                  </Form.Label>
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
                  <Form.Label>
                    <strong>Description</strong>
                  </Form.Label>
                  <textarea
                    className='form-control'
                    type='textarea'
                    placeholder='Enter description'
                    value={description}
                    name='description'
                    onChange={handleInputChange}
                    required
                    rows={15}
                  ></textarea>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Label>
                  <strong>Ingredients</strong>
                </Form.Label>
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
                              // required
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
                              // required
                            ></Form.Control>

                            {/* <Form.Label className='mt-2'>
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
                            ></Form.Control> */}

                            <Form.Group
                              controlId='recipeImage'
                              className='mb-4'
                            >
                              <Form.Label className='mt-2'>Image</Form.Label>
                              <Form.Control
                                type='file'
                                name='image'
                                accept='image/*'
                                onChange={(event) =>
                                  ingredientsInputHandler(index, event)
                                }
                              />
                            </Form.Group>

                            {/* {ingredientField.image && (
                              <>
                                <Form.Label>Image Uploaded: </Form.Label>
                                <img
                                  width={200}
                                  height={300}
                                  src={selectedImage}
                                  className='m-3'
                                />
                              </>
                            )} */}

                            <Button
                              className='mt-3'
                              variant='light'
                              onClick={addIngredientFields}
                            >
                              Add new ingredient
                            </Button>

                            {index > 0 && (
                              <>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button
                                  className='mt-3 '
                                  type='button'
                                  onClick={() => handleRemoveIngredient(index)}
                                >
                                  Remove
                                </Button>
                              </>
                            )}
                          </Container>
                        </Card>
                      </div>
                    ))}
                  </Container>
                </Card>

                <Form.Label className='pt-3'>
                  <strong>Nutrional Value</strong>
                </Form.Label>
                <Card className=' pb-3'>
                  <Container>
                    {servingFields.map((servingField, index) => (
                      <div key={index}>
                        <Card className='mt-3 pb-3'>
                          <Container>
                            <Form.Label className='mt-2'>
                              Nutrition Name
                            </Form.Label>
                            <Form.Control
                              name='name'
                              type='text'
                              placeholder='Enter Serving Name'
                              value={servingField.name}
                              onChange={(event) =>
                                servingsInputHandler(index, event)
                              }
                              // required
                            ></Form.Control>

                            <Form.Label className='mt-2'>
                              Nutrition Size
                            </Form.Label>
                            <Form.Control
                              name='size'
                              type='text'
                              placeholder='Enter Serving Size'
                              value={servingField.size}
                              onChange={(event) =>
                                servingsInputHandler(index, event)
                              }
                              // required
                            ></Form.Control>

                            <Button
                              className='mt-3'
                              variant='light'
                              onClick={addServingFields}
                            >
                              Add new nutritions
                            </Button>

                            {index > 0 && (
                              <>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button
                                  className='mt-3 '
                                  type='button'
                                  onClick={() => handleRemoveServing(index)}
                                >
                                  Remove
                                </Button>
                              </>
                            )}
                          </Container>
                        </Card>
                      </div>
                    ))}
                  </Container>
                </Card>

                <Form.Label className='pt-3'>
                  <strong>Steps</strong>
                </Form.Label>
                <Card className=' pb-3'>
                  <Container>
                    {directionFields.map((directionField, index) => (
                      <div key={index}>
                        <Card className='mt-3 pb-3'>
                          <Container>
                            <Form.Label className='mt-2'>
                              Description
                            </Form.Label>
                            <textarea
                              className='form-control'
                              name='description'
                              type='text'
                              placeholder='Enter description'
                              value={directionField.description}
                              onChange={(event) =>
                                directionInputHandler(index, event)
                              }
                              // required
                            ></textarea>

                            {/* <Form.Label className='mt-2'>Image</Form.Label>
                            <Form.Control
                              name='image'
                              type='text'
                              placeholder='Enter Ingredient Size'
                              value={directionField.image}
                              onChange={(event) =>
                                directionInputHandler(index, event)
                              }
                            ></Form.Control> */}

                            <Form.Group className='mb-4'>
                              <Form.Label>Image</Form.Label>
                              <Form.Control
                                type='file'
                                name='image'
                                accept='image/*'
                                onChange={(event) =>
                                  directionInputHandler(index, event)
                                }
                              />
                            </Form.Group>

                            <Button
                              className='mt-3'
                              variant='light'
                              onClick={addDirectionFields}
                            >
                              Add new directions
                            </Button>

                            {index > 0 && (
                              <>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button
                                  className='mt-3 '
                                  type='button'
                                  onClick={() => handleRemoveDirection(index)}
                                >
                                  Remove
                                </Button>
                              </>
                            )}
                          </Container>
                        </Card>
                      </div>
                    ))}
                  </Container>
                </Card>
              </Col>

              <Col md={2}>
                <Form.Group controlId='tags'>
                  <Form.Label>Tags</Form.Label>
                  {tags.map((tag) => (
                    <Form.Check
                      key={tag._id}
                      type='checkbox'
                      label={tag.name}
                      value={tag._id}
                      checked={selectedTags.includes(tag._id)}
                      onChange={handleTagChange}
                    />
                  ))}
                </Form.Group>
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
    </>
  );
};

export default withRouter(ProductCreateScreen);
