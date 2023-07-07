import { formatDistanceToNow } from "date-fns";

interface ComicResponse {
  img: string;
  alt: string;
  safe_title: string;
  year: number;
  month: number;
  day: number;
}


async function displayComic(): Promise<void> {
  try {
    const email: string = "a.barabanova@innopolis.university";
    const params = new URLSearchParams({ email: email });
    const response: Response = await fetch(
      `https://fwd.innopolis.university/api/hw2?${params.toString()}`
    );
    const comicId: string = await response.json();

    const comicParams = new URLSearchParams({ id: comicId });
    const comicResponse: Response = await fetch(
      `https://fwd.innopolis.university/api/comic?${comicParams.toString()}`
    );

    const comicData: ComicResponse = await comicResponse.json();

    const img: HTMLImageElement = document.createElement("img");
    img.src = comicData.img;
    img.alt = comicData.alt;

    const title: HTMLParagraphElement = document.createElement("p");
    title.textContent = comicData.safe_title;

    const date: HTMLParagraphElement = document.createElement("p");
    const dateObj: Date = new Date(
      comicData.year,
      comicData.month - 1,
      comicData.day
    );
    date.textContent = dateObj.toLocaleDateString();

    const fromNow: HTMLParagraphElement = document.createElement("p");
    fromNow.textContent = `${formatDistanceToNow(dateObj)} ago`;

    const comicPage: HTMLElement | null = document.getElementById("comic-page");
    if (!comicPage) {
      throw new Error("Comic page element not found");
    }

    comicPage.appendChild(title);
    comicPage.appendChild(img);
    comicPage.appendChild(date);
    comicPage.appendChild(fromNow);
  } catch (error: unknown) {
    console.error("Error:", error);
  }
}

await displayComic();
