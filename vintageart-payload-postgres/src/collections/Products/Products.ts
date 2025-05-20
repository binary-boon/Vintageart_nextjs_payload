// import { CollectionConfig } from 'payload'

// const Products: CollectionConfig = {
//   slug: 'products',
//   admin: {
//     useAsTitle: 'name',
//   },

//     //
//   fields: [
//     {
//       name: 'name',
//       type: 'text',
//       required: true,
//     },

//     {
//       name: 'price',
//       type: 'number',
//       required: true,
//     },
//     {
//       name: 'image',
//       type: 'upload',
//       relationTo: 'media',
//     },

//     // Added slug field for cleaner URLs
//     {
//       name: 'slug',
//       type: 'text',
//       admin: {
//         position: 'sidebar',
//       },
//       hooks: {
//         beforeValidate: [
//           ({ value, data }) => {
//             // If no slug is provided, generate one from the name
//             if (!value && data.name) {
//               return data.name
//                 .toLowerCase()
//                 .replace(/[^\w ]+/g, '')
//                 .replace(/ +/g, '-')
//             }
//             return value
//           },
//         ],
//       },
//     },
//   ],
// }

// export default Products
