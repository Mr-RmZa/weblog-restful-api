import fs from "fs";
import sharp from "sharp";
import shortId from "shortid";
import appRoot from "app-root-path";
import { Blog } from "../models/Blog";
import { Request, Response } from "express";
import { schemaImage, schemaPost } from "../models/secure/postValidation";

export class postController {
  public static async index(
    req: Request,
    res: Response,
    next: (arg0: unknown) => any
  ) {
    try {
      const numberOfPosts = await Blog.find({
        status: "public",
      }).countDocuments();

      const posts = await Blog.find({ status: "public" }).sort({
        createdAt: "desc",
      });

      return res.status(200).json({ posts, total: numberOfPosts });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  public static async show(
    req: Request,
    res: Response,
    next: (arg0: unknown) => any
  ) {
    try {
      try {
        const post = await Blog.findOne({ _id: req.params.id }).populate(
          "user"
        );
        if (post) {
          return res.status(200).json({ post });
        } else {
          return res.status(404).json({ message: "Not Found" });
        }
      } catch (error) {
        return res.status(404).json({ message: "Not Found" });
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  public static store(
    req: {
      files: { thumbnail: any };
      body: any;
      user: { id: any };
      flash: (arg0: string, arg1: string) => void;
    },
    res: any
  ) {
    try {
      const thumbnail = req.files ? req.files.thumbnail : {};
      const fileName = `${shortId.generate()}_${thumbnail.name}`;
      const uploadPath = `${appRoot}/public/uploads/thumbnails/${fileName}`;
      req.body = { ...req.body, thumbnail };
      schemaPost
        .validate(req.body, { abortEarly: false })
        .then(async () => {
          await sharp(thumbnail.data)
            .jpeg({ quality: 60 })
            .toFile(uploadPath)
            .catch((err) => console.log(err));
          await Blog.create({
            ...req.body,
            user: req.user.id,
            thumbnail: fileName,
          });
          req.flash("success_msg", "post created!");
          return res.redirect("/admin");
        })
        .catch((err: { errors: string }) => {
          req.flash("error", err.errors);
          return res.redirect("/blog/create");
        });
    } catch (error) {
      console.log(error);
      return res.redirect("/error/500");
    }
  }

  public static upload(req: { files: { image: any }; body: any }, res: any) {
    try {
      if (req.files) {
        const image = req.files ? req.files.image : {};
        const fileName = `${shortId.generate()}_${image.name}`;
        const uploadPath = `${appRoot}/public/uploads/${fileName}`;
        req.body = { ...req.body, image };
        schemaImage
          .validate(req.body, { abortEarly: false })
          .then(async () => {
            await sharp(image.data)
              .jpeg({ quality: 60 })
              .toFile(uploadPath)
              .catch((err) => console.log(err));
            return res
              .status(200)
              .send(`http://${process.env.URL}:3000/uploads/${fileName}`);
          })
          .catch((err: { errors: string }) => {
            return res.status(400).send(err.errors);
          });
      } else {
        return res.send("you must select a photo to upload");
      }
    } catch (error) {
      console.log(error);
      return res.redirect("/error/500");
    }
  }

  public static async update(
    req: {
      files: { thumbnail: any };
      params: { id: any };
      body: any;
      user: { _id: string };
      flash: (arg0: string, arg1: string) => void;
    },
    res: any
  ) {
    try {
      const thumbnail = req.files ? req.files.thumbnail : {};
      const fileName = `${shortId.generate()}_${thumbnail.name}`;
      const uploadPath = `${appRoot}/public/uploads/thumbnails/${fileName}`;
      const post = await Blog.findOne({ _id: req.params.id });
      if (thumbnail.name) {
        req.body = { ...req.body, thumbnail };
      } else {
        req.body = {
          ...req.body,
          thumbnail: {
            name: "placeholder",
            size: 0,
            mimetype: "image/jpeg",
          },
        };
      }
      schemaPost
        .validate(req.body, { abortEarly: false })
        .then(async () => {
          if (post) {
            if (post.user!.toString() == req.user._id) {
              if (thumbnail.name) {
                fs.unlink(
                  `${appRoot}/public/uploads/thumbnails/${post.thumbnail}`,
                  async (err: any) => {
                    if (err) console.log(err);
                    else {
                      await sharp(thumbnail.data)
                        .jpeg({ quality: 60 })
                        .toFile(uploadPath)
                        .catch((err) => console.log(err));
                    }
                  }
                );
              }

              const { title, status, body } = req.body;
              post.title = title;
              post.status = status;
              post.body = body;
              post.thumbnail = thumbnail.name ? fileName : post.thumbnail;

              await post.save();
              req.flash("success_msg", "post edited!");
              return res.redirect("/admin");
            } else {
              req.flash("error", "there is nothing!");
              return res.redirect("/admin");
            }
          } else {
            req.flash("error", "there is nothing!");
            return res.redirect("/admin");
          }
        })
        .catch((err) => {
          req.flash("error", err.errors);
          return res.redirect(`/blog/edit/${req.params.id}`);
        });
    } catch (error) {
      console.log(error);
      return res.redirect("/error/500");
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const post = await Blog.findOne({
        _id: req.params.id,
      });
      if (post) {
        await Blog.findByIdAndDelete(req.params.id);
        fs.unlink(
          `${appRoot}/public/uploads/thumbnails/${post.thumbnail}`,
          (err: any) => {
            if (err) console.log(err);
          }
        );
        return res.redirect("/admin");
      } else {
        return res.redirect("/admin");
      }
    } catch (error) {
      console.log(error);
      return res.redirect("/error/500");
    }
  }
}
