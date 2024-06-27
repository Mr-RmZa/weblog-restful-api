// import fs from "fs";
// import sharp from "sharp";
// import shortId from "shortid";
// import appRoot from "app-root-path";
// import { Blog } from "../models/Blog";
// import { Request, Response } from "express";
// import { ErrorController } from "./errorController";
// import { schemaImage, schemaPost } from "../models/secure/postValidation";

// export class postController {
//   public static async index(
//     req: Request,
//     res: Response,
//     next: (arg0: unknown) => any
//   ) {
//     try {
//       const numberOfPosts = await Blog.find({
//         status: "public",
//       }).countDocuments();
//       const posts = await Blog.find({ status: "public" }).sort({
//         createdAt: "desc",
//       });
//       return res.status(200).json({ posts, total: numberOfPosts });
//     } catch (error) {
//       console.log(error);
//       return next(error);
//     }
//   }

//   public static async show(
//     req: Request,
//     res: Response,
//     next: (arg0: unknown) => any
//   ) {
//     try {
//       try {
//         const post = await Blog.findOne({ _id: req.params.id }).populate(
//           "user"
//         );
//         if (post) {
//           return res.status(200).json({ post });
//         } else {
//           ErrorController.error("not found!", 404, next);
//         }
//       } catch (error) {
//         ErrorController.error("not found!", 404, next);
//       }
//     } catch (error) {
//       console.log(error);
//       return next(error);
//     }
//   }

//   public static create(req: any, res: Response, next: (arg0: unknown) => any) {
//     try {
//       const thumbnail = req.files ? req.files.thumbnail : {};
//       req.body = { ...req.body, thumbnail };
//       schemaPost
//         .validate(req.body, { abortEarly: false })
//         .then(async () => {
//           const fileName = `${shortId.generate()}_${thumbnail.name}`;
//           const uploadPath = `${appRoot}/public/uploads/thumbnails/${fileName}`;
//           await sharp(thumbnail.data)
//             .jpeg({ quality: 60 })
//             .toFile(uploadPath)
//             .catch((error) => console.log(error));
//           await Blog.create({
//             ...req.body,
//             user: req.userId,
//             thumbnail: fileName,
//           });
//           res.status(201).json({ message: "post created!" });
//         })
//         .catch((error) => {
//           ErrorController.error(error.errors, 422, next);
//         });
//     } catch (error) {
//       console.log(error);
//       return next(error);
//     }
//   }

//   public static upload(
//     req: { files: { image: any }; body: any },
//     res: any,
//     next: any
//   ) {
//     try {
//       if (req.files) {
//         const image = req.files ? req.files.image : {};
//         req.body = { ...req.body, image };
//         schemaImage
//           .validate(req.body, { abortEarly: false })
//           .then(async () => {
//             const fileName = `${shortId.generate()}_${image.name}`;
//             const uploadPath = `${appRoot}/public/uploads/${fileName}`;
//             await sharp(image.data)
//               .jpeg({ quality: 60 })
//               .toFile(uploadPath)
//               .catch((error) => console.log(error));
//             return res
//               .status(200)
//               .send(`http://${process.env.URL}:3000/uploads/${fileName}`);
//           })
//           .catch((error) => {
//             ErrorController.error(error.errors, 400, next);
//           });
//       } else {
//         ErrorController.error("you must select a photo to upload", 400, next);
//       }
//     } catch (error) {
//       console.log(error);
//       return next(error);
//     }
//   }

//   public static async edit(
//     req: {
//       files: { thumbnail: any };
//       body: any;
//       params: { id: any };
//       userId: string;
//     },
//     res: any,
//     next: any
//   ) {
//     try {
//       const thumbnail = req.files ? req.files.thumbnail : {};
//       if (thumbnail.name) {
//         req.body = { ...req.body, thumbnail };
//       } else {
//         req.body = {
//           ...req.body,
//           thumbnail: {
//             name: "placeholder",
//             size: 0,
//             mimetype: "image/jpeg",
//           },
//         };
//       }
//       schemaPost
//         .validate(req.body, { abortEarly: false })
//         .then(async () => {
//           const fileName = `${shortId.generate()}_${thumbnail.name}`;
//           const uploadPath = `${appRoot}/public/uploads/thumbnails/${fileName}`;
//           const post = await Blog.findOne({ _id: req.params.id });
//           if (post) {
//             if (post.user!.toString() == req.userId) {
//               if (thumbnail.name) {
//                 fs.unlink(
//                   `${appRoot}/public/uploads/thumbnails/${post.thumbnail}`,
//                   async (error: any) => {
//                     if (error) console.log(error);
//                     else {
//                       await sharp(thumbnail.data)
//                         .jpeg({ quality: 60 })
//                         .toFile(uploadPath)
//                         .catch((error) => console.log(error));
//                     }
//                   }
//                 );
//               }

//               const { title, status, body } = req.body;
//               post.title = title;
//               post.status = status;
//               post.body = body;
//               post.thumbnail = thumbnail.name ? fileName : post.thumbnail;

//               await post.save();
//               return res.status(200).json({ message: "post edited!" });
//             } else {
//               ErrorController.error("your not permissions!", 401, next);
//             }
//           } else {
//             ErrorController.error("not found!", 404, next);
//           }
//         })
//         .catch((error) => {
//           ErrorController.error(error.errors, 422, next);
//         });
//     } catch (error) {
//       console.log(error);
//       return next(error);
//     }
//   }

//   public static async delete(
//     req: Request,
//     res: Response,
//     next: (arg0: unknown) => any
//   ) {
//     try {
//       const post = await Blog.findOne({
//         _id: req.params.id,
//       });
//       if (post) {
//         await Blog.findByIdAndDelete(req.params.id);
//         fs.unlink(
//           `${appRoot}/public/uploads/thumbnails/${post.thumbnail}`,
//           (error: any) => {
//             if (error) console.log(error);
//             return;
//           }
//         );
//         return res.status(200).json({ message: "post deleted!" });
//       } else {
//         ErrorController.error("not found!", 404, next);
//       }
//     } catch (error) {
//       console.log(error);
//       return next(error);
//     }
//   }
// }
