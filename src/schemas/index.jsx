import * as Yup from 'yup'

const signUpSchema = Yup.object({
    name: Yup.string().min(3, "Name must be at least 3 characters").required('Name is required'),
    email: Yup.string().email('Enter valid email address').required('Email is required'),
    password: Yup.string().min(8, "Password must be at least 8 characters").required('Password is required'),
    confirmPassword: Yup.string().min(8, "Confirm password must be at least 8 characters").required('Confirm password is required').oneOf([Yup.ref('password'), null],
        'Password must match'),
});

const loginSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const resetSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
});

const resetPasswordSchema = Yup.object({
    password: Yup.string().min(8, "Password must be at least 8 characters").required('Password is required'),
    confirmPassword: Yup.string().min(8, "Confirm password must be at least 8 characters").required('Confirm password is required').oneOf([Yup.ref('password'), null],
        'Password must match'),
});

const changePasswordSchema = Yup.object({
    password: Yup.string().required('Password is required'),
    newPassword: Yup.string().min(8, "Password must be at least 8 characters").required('Password is required'),
    confirmNewPassword: Yup.string().min(8, "Confirm password must be at least 8 characters").required('Confirm password is required').oneOf([Yup.ref('newPassword'), null],
        'Password must match'),
});

const uploadPropertySchema = Yup.object().shape({

    propertyType: Yup.string().required('Property type is required'),
    title: Yup.string().required('Title is required'),
    price: Yup.number().moreThan(0, 'Number must be greater than 0').required('Price is required'),
    date: Yup.string().required('Price is required'),
    area: Yup.number().moreThan(0, 'Number must be greater than 0').required('Area is required'),

    room: Yup.string().test('room', 'Room is required', function (value) {
        if (["home", "newHome"].includes(this.parent.propertyType)) {
            return !!value;
        } else {
            return true;
        }
    }),

    landType: Yup
        .string()
        .when("propertyType", {
            is: "land",
            then: (schema) => schema.required('Land is required')
        }),

    unit: Yup
    .number().moreThan(0, 'Number must be greater than 0')
        .when("propertyType", {
            is: "garage",
            then: (schema) => schema.required('Unit is required')
        }),

    wide: Yup
    .number().moreThan(0, 'Number must be greater than 0')
        .when("propertyType", {
            is: "garage",
            then: (schema) => schema.required('Wide is required')
        }),

    long: Yup
    .number().moreThan(0, 'Number must be greater than 0')
        .when("propertyType", {
            is: "garage",
            then: (schema) => schema.required('Long is required')
        }),

    height: Yup
    .number().moreThan(0, 'Number must be greater than 0')
        .when("propertyType", {
            is: "garage",
            then: (schema) => schema.required('height is required')
        }),

        kitchen: Yup.number().moreThan(0, 'Number must be greater than 0').test('kitchen', 'Kitchen is required', function(value) {
            if (["home", "newHome", "office", "room", "building", "commercialProperties"].includes(this.parent.propertyType)) {
              return !!value;
            } else {
              return true;
            }
          }),

        bath: Yup.number().moreThan(0, 'Number must be greater than 0').test('bath', 'Bath is required', function(value) {
            if (["home", "newHome", "office", "room", "building", "commercialProperties"].includes(this.parent.propertyType)) {
              return !!value;
            } else {
              return true;
            }
          }),

          livingRoom: Yup.number().moreThan(0, 'Number must be greater than 0').test('livingRoom', 'Living room is required', function(value) {
            if (["home", "newHome"].includes(this.parent.propertyType)) {
              return !!value;
            } else {
              return true;
            }
          }),

          floorNumber: Yup.number().moreThan(0, 'Number must be greater than 0').test('floorNumber', 'Floor no is required', function(value) {
            if (["'commercialProperties', ", "office" , "building" , "room"].includes(this.parent.propertyType)) {
              return !!value;
            } else {
              return true;
            }
          }),

        totalFloors: Yup.number().moreThan(0, 'Number must be greater than 0').test('totalFloors', 'Floors is required', function(value) {
            if (["home" , "newHome"].includes(this.parent.propertyType)) {
              return !!value;
            } else {
              return true;
            }
          }),


    description: Yup.string().required('Description is required'),
    postalCode: Yup.number().moreThan(0, 'Number must be greater than 0').required('Postalcode is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
    areaLocation: Yup.string().required('Area is required'),
    streetNumber: Yup.number().moreThan(0, 'Number must be greater than 0').required('Street no is required'),
    location: Yup.string().required('Location is required'),
    longitude: Yup.string().required('Longitude is required'),
    latitude: Yup.string().required('Latitude is required'),
});
const updatePropertySchema = Yup.object().shape({

    propertyType: Yup.string().required('Property type is required'),
    title: Yup.string().required('Title is required'),
    price: Yup.number().moreThan(0, 'Number must be greater than 0').required('Price is required'),
    date: Yup.string().required('Price is required'),
    area: Yup.number().moreThan(0, 'Number must be greater than 0').required('Area is required'),

    room: Yup.string().test('room', 'Room is required', function (value) {
        if (["home", "newHome"].includes(this.parent.propertyType)) {
            return !!value;
        } else {
            return true;
        }
    }),

    landType: Yup
        .string()
        .when("propertyType", {
            is: "land",
            then: (schema) => schema.required('Land is required')
        }),

    unit: Yup
        .string()
        .when("propertyType", {
            is: "garage",
            then: (schema) => schema.required('Unit is required')
        }),

    wide: Yup
        .string()
        .when("propertyType", {
            is: "garage",
            then: (schema) => schema.required('Wide is required')
        }),

    long: Yup
        .string()
        .when("propertyType", {
            is: "garage",
            then: (schema) => schema.required('Long is required')
        }),

    height: Yup
        .string()
        .when("propertyType", {
            is: "garage",
            then: (schema) => schema.required('height is required')
        }),

        kitchen: Yup.number().moreThan(0, 'Number must be greater than 0').test('kitchen', 'Kitchen is required', function(value) {
            if (["home", "newHome", "office", "room", "building", "commercialProperties"].includes(this.parent.propertyType)) {
              return !!value;
            } else {
              return true;
            }
          }),

        bath: Yup.number().moreThan(0, 'Number must be greater than 0').test('bath', 'Bath is required', function(value) {
            if (["home", "newHome", "office", "room", "building", "commercialProperties"].includes(this.parent.propertyType)) {
              return !!value;
            } else {
              return true;
            }
          }),

          livingRoom: Yup.number().moreThan(0, 'Number must be greater than 0').test('livingRoom', 'Living room is required', function(value) {
            if (["home", "newHome"].includes(this.parent.propertyType)) {
              return !!value;
            } else {
              return true;
            }
          }),

          floorNumber: Yup.number().moreThan(0, 'Number must be greater than 0').test('floorNumber', 'Floor no is required', function(value) {
            if (["'commercialProperties', ", "office" , "building" , "room"].includes(this.parent.propertyType)) {
              return !!value;
            } else {
              return true;
            }
          }),

        totalFloors: Yup.number().moreThan(0, 'Number must be greater than 0').test('totalFloors', 'Floors is required', function(value) {
            if (["home" , "newHome"].includes(this.parent.propertyType)) {
              return !!value;
            } else {
              return true;
            }
          }),


    description: Yup.string().required('Description is required'),
    postalCode: Yup.number().moreThan(0, 'Number must be greater than 0').required('Postalcode is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
    areaLocation: Yup.string().required('Area is required'),
    streetNumber: Yup.number().moreThan(0, 'Number must be greater than 0').required('Street no is required'),
    location: Yup.string().required('Location is required'),
    longitude: Yup.string().required('Longitude is required'),
    latitude: Yup.string().required('Latitude is required'),
});


export {
    signUpSchema,
    loginSchema,
    resetSchema,
    resetPasswordSchema,
    changePasswordSchema,
    uploadPropertySchema,
    updatePropertySchema
}
