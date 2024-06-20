"use client";
import Link from "next/link";
import Typed from "typed.js";
import Image from "next/image";
import { useEffect, useRef } from "react";

function Index() {
  const el = useRef(null);
  useEffect(() => {
    require("bootstrap/dist/js/particles.min.js");
    require("bootstrap/dist/js/particles-config.js");
    const typed = new Typed(el.current, {
      strings: [
        `هم زمان می توانید چندین پیامرسان داخلی و خارجی و چندین کانال و گروه
      خود را مدیریت کنید ، به راحتی تولید محتوا کنید با استفاده از اینترنت
      نیم بها و بدون فیلتر و سرعت بالا`,
      ],
      typeSpeed: 50,
    });
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section>
      <div id="particles-js" className="vh-100 bg-dark"></div>
      <span
        className="scroll-down"
        onClick={() => {
          window.scrollTo({
            top: 920,
            behavior: "smooth",
          });
        }}
      ></span>
      <div className="position-absolute top-50 start-50 translate-middle text-white text-center w-100 cover-container p-4">
        <h1>نام سایت</h1>
        <span className="lead" ref={el} />
      </div>

      <div
        className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary rounded-5"
        id="more"
      >
        <div className="col-md-6 p-lg-5 mx-auto my-5">
          <h1 className="display-3 fw-bold">نام سایت</h1>
          <h2 className="fw-normal text-muted mb-3">
            مدیریت تمامی پیامرسان ها با همه کانال و گروه های شما
          </h2>
          <div className="d-flex justify-content-center lead fw-normal">
            <Link href={"/plan"} className="icon-link icon-link-hover">
              مشاهده پلن ها
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="product-device shadow-sm d-none d-xl-block"></div>
        <div className="product-device product-device-2 shadow-sm d-none d-xl-block"></div>
      </div>

      <div className="d-xl-flex flex-md-equal w-100 my-md-3 ps-md-3 text-center">
        <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 overflow-hidden rounded-5">
          <div className="my-3 py-3">
            <h3 className="display-5">تلگرام</h3>
            <p className="lead">
              تلگرام یک برنامه پیام رسانی متن باز است که توسط Telegram Messenger
              LLC برای گوشی های هوشمند و دستگاه های دیگر توسعه یافته است. برنامه
              رسمی برای اندروید، iOS، ویندوز، لینوکس و macOS در دسترس است.
              تلگرام همچنین دارای افزونه های مرورگر و برنامه های مبتنی بر وب
              است.
            </p>
          </div>
          <div
            className="bg-telegram shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "300px",
              borderRadius: "21px 21px 0 0",
            }}
          ></div>
        </div>
        <div className="bg-body-tertiary me-md-3 pt-3 px-3 pt-md-5 px-md-5 overflow-hidden rounded-5">
          <div className="my-3 p-3">
            <h3 className="display-5">بله</h3>
            <p className="lead">
              پیام‌رسان بانکی بله، شبکۀ اجتماعی‌مالی بانک ملّی ایران است که
              هم‌زمان امکان گفتگو و پرداخت را برای شما فراهم می‌کند. با بله
              می‌توانید به‌راحتی تماس صوتی و تصویری بگیرید و و با استفاده از
              ویژگی «وضعیت»، لحظه‌های خود را با دوستانتان به اشتراک بگذارید.
            </p>
          </div>
          <div
            className="bg-bale shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "300px",
              borderRadius: "21px 21px 0 0",
            }}
          ></div>
        </div>
      </div>

      <div className="d-xl-flex flex-md-equal w-100 my-md-3 ps-md-3 text-center">
        <div className="bg-body-tertiary me-md-3 pt-3 px-3 pt-md-5 px-md-5 overflow-hidden rounded-5">
          <div className="my-3 p-3">
            <h3 className="display-5">اینستاگرام</h3>
            <p className="lead">
              اینستاگرام یک سرویس شبکه اجتماعی اشتراک‌گذاری عکس و ویدیو است. به
              کاربران امکان می دهد رسانه هایشان را بارگذاری کنند ، از طریق برچسب
              گذاری جغرافیایی با یک مکان مرتبط شوند. پست ها را می توان به صورت
              عمومی یا خصوصی به اشتراک گذاشته شود.
            </p>
          </div>
          <div
            className="bg-instagram shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "300px",
              borderRadius: "21px 21px 0 0",
            }}
          ></div>
        </div>
        <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 overflow-hidden rounded-5">
          <div className="my-3 py-3">
            <h3 className="display-5">ایتا</h3>
            <p className="lead">
              پیام‌رسان ایتا با هدف برآوردن کلیه نیازهای کاربران ایرانی در یک
              برنامه پیام‌رسان طراحی شده است، در ایتا شما می‌توانید به سهولت با
              دوستان خود گفتگو کنید، فایل‌های خود را به اشتراک بگذارید، گروه و
              کانال بسازید و از قابلیت‌های پیشرفته ایتا برای مدیریت و شخصی‌سازی
              نرم‌افزار خود استفاده کنید.
            </p>
          </div>
          <div
            className="bg-eitaa shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "300px",
              borderRadius: "21px 21px 0 0",
            }}
          ></div>
        </div>
      </div>

      <div className="d-xl-flex flex-md-equal w-100 my-md-3 ps-md-3 text-center">
        <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 overflow-hidden rounded-5">
          <div className="my-3 p-3">
            <h3 className="display-5">فیسبوک</h3>
            <p className="lead">
              متا پلتفرم، شرکت، که به عنوان متا تجارت می کند و قبلاً Facebook،
              Inc. و TheFacebook، Inc. نامیده می شد، یک شرکت فناوری چندملیتی
              آمریکایی است که در منلو پارک، کالیفرنیا مستقر است. این شرکت مالک و
              اداره کننده فیس بوک، اینستاگرام، Threads و WhatsApp و سایر محصولات
              و خدمات است.
            </p>
          </div>
          <div
            className="bg-facebook shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "300px",
              borderRadius: "21px 21px 0 0",
            }}
          ></div>
        </div>
        <div className="bg-body-tertiary me-md-3 pt-3 px-3 pt-md-5 px-md-5 overflow-hidden rounded-5">
          <div className="my-3 py-3">
            <h3 className="display-5">واتساپ</h3>
            <p className="lead">
              واتس اپ یک سرویس پیام رسانی فوری و صوتی از طریق IP است که متعلق به
              شرکت فناوری متا است. این به کاربران امکان می دهد پیام های متنی،
              صوتی و پیام های ویدیویی ارسال کنند، تماس های صوتی و تصویری برقرار
              کنند و تصاویر، اسناد، مکان های کاربر و سایر محتواها را به اشتراک
              بگذارند.
            </p>
          </div>
          <div
            className="bg-whatsapp shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "300px",
              borderRadius: "21px 21px 0 0",
            }}
          ></div>
        </div>
      </div>

      <div className="d-xl-flex flex-md-equal w-100 my-md-3 ps-md-3 text-center">
        <div className="bg-body-tertiary me-md-3 pt-3 px-3 pt-md-5 px-md-5 overflow-hidden rounded-5">
          <div className="my-3 p-3">
            <h3 className="display-5">توییتر</h3>
            <p className="lead">
              توییتر یک شرکت رسانه اجتماعی آمریکایی مستقر در سانفرانسیسکو،
              کالیفرنیا بود. این شرکت سرویس شبکه اجتماعی توییتر و قبلاً برنامه
              ویدیوی کوتاه Vine و سرویس پخش زنده Periscope را اداره می کرد.
            </p>
          </div>
          <div
            className="bg-twitter shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "300px",
              borderRadius: "21px 21px 0 0",
            }}
          ></div>
        </div>
        <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 overflow-hidden rounded-5">
          <div className="my-3 p-3">
            <h3 className="display-5">بزودی...</h3>
            <p className="lead">
              <br />
              <br />
              <br />
            </p>
          </div>
          <div
            className="bg-body-tertiary shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "300px",
              borderRadius: "21px 21px 0 0",
            }}
          ></div>
        </div>
      </div>

      <div className="container-fluid text-center">
        <hr />

        <div className="row">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">
              <span className="text-body-secondary">پیامرسان </span>
              بله
            </h2>
            <p className="lead">
              وجه الإنسان هو جزء معقَّد ومتميِّز للغاية من جسمه. وفي الواقع، إنه
              أحد أكثر أنظمة الإشارات المتاحة تعقيداً لدينا؛ فهو يتضمَّن أكثر من
              40 عضلة مستقلة هيكلياً ووظيفياً، بحيث يمكن تشغيل كل منها بشكل
              مستقل عن البعض الآخر؛ وتشكِّل أحد أقوى مؤشرات العواطف.
            </p>
          </div>
          <div className="col-md-5">
            <Image
              className="img-fluid rounded mx-auto d-block"
              width={400}
              height={400}
              alt="loading"
              src={"/img/bale.webp"}
              priority={true}
              unoptimized={true}
            />
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading fw-normal lh-1">
              <span className="text-body-secondary">پیامرسان </span>
              ایتا
            </h2>
            <p className="lead">
              عندما نضحك أو نبكي، فإننا نعرض عواطفنا، مما يسمح للآخرين بإلقاء
              نظرة خاطفة على أذهاننا أثناء "قراءة" وجوهنا بناءً على التغييرات في
              مكوّنات الوجه الرئيسة، مثل: العينين والحاجبين والجفنين والأنف
              والشفتين.
            </p>
          </div>
          <div className="col-md-5 order-md-1">
            <Image
              className="img-fluid rounded mx-auto d-block"
              width={400}
              height={400}
              alt="loading"
              src={"/img/eitaa.webp"}
              priority={true}
              unoptimized={true}
            />
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">
              <span className="text-body-secondary">پیامرسان </span>
              اینستاگرام
            </h2>
            <p className="lead">
              إن جميع العضلات في أجسامنا مدعمة بالأعصاب المتصلة من كافة أنحاء
              الجسم بالنخاع الشوكي والدماغ. وهذا الاتصال العصبي هو ثنائي
              الاتجاه، أي إن العصب يتسبَّب في تقلصات العضلات بناءً على إشارات
              الدماغ، ويقوم في الوقت نفسه بإرسال معلومات عن حالة العضلات إلى
              الدماغ
            </p>
          </div>
          <div className="col-md-5">
            <Image
              className="img-fluid rounded mx-auto d-block"
              width={400}
              height={400}
              alt="loading"
              src={"/img/instagram.webp"}
              priority={true}
              unoptimized={true}
            />
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading fw-normal lh-1">
              <span className="text-body-secondary">پیامرسان </span>
              تلگرام
            </h2>
            <p className="lead">
              عندما نضحك أو نبكي، فإننا نعرض عواطفنا، مما يسمح للآخرين بإلقاء
              نظرة خاطفة على أذهاننا أثناء "قراءة" وجوهنا بناءً على التغييرات في
              مكوّنات الوجه الرئيسة، مثل: العينين والحاجبين والجفنين والأنف
              والشفتين.
            </p>
          </div>
          <div className="col-md-5 order-md-1">
            <Image
              className="img-fluid rounded mx-auto d-block"
              width={400}
              height={400}
              alt="loading"
              src={"/img/telegram.webp"}
              priority={true}
              unoptimized={true}
            />
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">
              <span className="text-body-secondary">پیامرسان </span>
              فیسبوک
            </h2>
            <p className="lead">
              وجه الإنسان هو جزء معقَّد ومتميِّز للغاية من جسمه. وفي الواقع، إنه
              أحد أكثر أنظمة الإشارات المتاحة تعقيداً لدينا؛ فهو يتضمَّن أكثر من
              40 عضلة مستقلة هيكلياً ووظيفياً، بحيث يمكن تشغيل كل منها بشكل
              مستقل عن البعض الآخر؛ وتشكِّل أحد أقوى مؤشرات العواطف.
            </p>
          </div>
          <div className="col-md-5">
            <Image
              className="img-fluid rounded mx-auto d-block"
              width={400}
              height={400}
              alt="loading"
              src={"/img/facebook.webp"}
              priority={true}
              unoptimized={true}
            />
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading fw-normal lh-1">
              <span className="text-body-secondary">پیامرسان </span>
              واتساپ
            </h2>
            <p className="lead">
              عندما نضحك أو نبكي، فإننا نعرض عواطفنا، مما يسمح للآخرين بإلقاء
              نظرة خاطفة على أذهاننا أثناء "قراءة" وجوهنا بناءً على التغييرات في
              مكوّنات الوجه الرئيسة، مثل: العينين والحاجبين والجفنين والأنف
              والشفتين.
            </p>
          </div>
          <div className="col-md-5 order-md-1">
            <Image
              className="img-fluid rounded mx-auto d-block"
              width={400}
              height={400}
              alt="loading"
              src={"/img/whatsapp.webp"}
              priority={true}
              unoptimized={true}
            />
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">
              <span className="text-body-secondary">پیامرسان </span>
              توییتر
            </h2>
            <p className="lead">
              إن جميع العضلات في أجسامنا مدعمة بالأعصاب المتصلة من كافة أنحاء
              الجسم بالنخاع الشوكي والدماغ. وهذا الاتصال العصبي هو ثنائي
              الاتجاه، أي إن العصب يتسبَّب في تقلصات العضلات بناءً على إشارات
              الدماغ، ويقوم في الوقت نفسه بإرسال معلومات عن حالة العضلات إلى
              الدماغ
            </p>
          </div>
          <div className="col-md-5">
            <Image
              className="img-fluid rounded mx-auto d-block"
              width={400}
              height={400}
              alt="loading"
              src={"/img/twitter.webp"}
              priority={true}
              unoptimized={true}
            />
          </div>
        </div>

        <hr />
      </div>
    </section>
  );
}

export default Index;
