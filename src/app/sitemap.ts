import { MetadataRoute } from "next";
import { CAR_MODELS } from "@/data/car-models";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://my-car-calc.com";

  // 1. 静的ページ
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/result`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. 車種別LP (プログラマティックSEO用)
  // 29車種すべてをサイトマップに登録
  const carRoutes: MetadataRoute.Sitemap = CAR_MODELS.map((car) => ({
    url: `${baseUrl}/simulation/${car.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...carRoutes];
}
