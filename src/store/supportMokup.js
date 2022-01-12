import moment from "moment";
const html = `<h3>Walking the capitals of Europe: Warsaw</h3>
        <figure class="image image-style-side">
            <img alt="Picture of the Warsaw Old Town." src="https://ckeditor.com/assets/images/bg/umbrellas-e935d5c582.jpg" />
            <figcaption>Medieval Old Town square, destroyed in 1944 & rebuilt after WWII.</figcaption>
        </figure>
        <p>If you enjoyed my previous articles in which we discussed wandering around <a href="#!" target="_blank" rel="noopener">Copenhagen</a> and <a href="#!" target="_blank" rel="noopener">Vilnius</a>, you’ll definitely love exploring <a href="https://en.wikipedia.org/wiki/Warsaw" target="_blank" rel="noopener">Warsaw</a>.</p>
        <h3>Time to put comfy sandals on!</h3>
        <p>Best time to visit the city is July and August, when it’s cool enough to not break a sweat and hot enough to enjoy summer. The city which has quite a combination of both old and modern textures is located by the river of Vistula.</p>
        <p>The historic <strong>Old Town</strong>, which was reconstructed after the World War II, with its late 18th century characteristics, is a must-see. You can start your walk from the <strong>Nowy Świat Street</strong> which will take you straight to the Old Town.</p>
        <p>Then you can go to the <strong>Powiśle</strong> area and take a walk on the newly renovated promenade on the riverfront. There are also lots of cafes, bars and restaurants where you can shake off the exhaustion of the day. On Sundays, there are many parks where you can enjoy nature or listen to pianists from around the world playing Chopin.</p>
        <p>For museum lovers, you can add these to your list:</p>
        <ul>
            <li>POLIN</li>
            <li>Warsaw Uprising Museum</li>
            <li>Fryderyk Chopin Museum</li>
        </ul>
        <h3>Next destination</h3>
        <p>We will go to Berlin and have a night's walk in the city that never sleeps! Make sure you subscribe to our newsletter!</p>`;
export const mokup = [
  {
    id: 0,
    no: 1,
    createdAt: moment().format("2021-06-12 09:50:11"),
    updatedAt: moment().format("2021-08-12 09:50:11"),
    category: 0,
    kind: 0,
    open: 0,
    popupOpen: 0,
    clientOrder: 1,
    language: 0,
    title: "안녕하세요",
    html: html,
    isFaq: false,
  },
  {
    id: 1,
    no: 2,
    createdAt: moment().format("2021-01-12 09:50:11"),
    updatedAt: moment().format("2021-03-12 09:50:11"),
    category: 0,
    kind: 1,
    open: 1,
    popupOpen: 1,
    clientOrder: 1,
    language: 1,
    title: "반갑습니다.",
    html: html,
    isFaq: false,
  },
  {
    id: 2,
    no: 1,
    createdAt: moment().format("2021-06-12 09:50:11"),
    updatedAt: moment().format("2021-08-12 09:50:11"),
    category: 0,
    kind: 0,
    open: 0,
    popupOpen: 0,
    clientOrder: 1,
    language: 0,
    title: "회원 가입은 어떻게 하나요?",
    html: html,
    isFaq: true,
  },
  {
    id: 3,
    no: 1,
    createdAt: moment().format("2021-06-12 09:50:11"),
    updatedAt: moment().format("2021-08-12 09:50:11"),
    category: 2,
    kind: 1,
    open: 1,
    popupOpen: 0,
    clientOrder: 3,
    language: 2,
    title: "고객센터의 영업시간은 어떻게되나요?",
    html: html,
    isFaq: true,
  },
  {
    id: 4,
    no: 1,
    createdAt: moment().format("2021-06-12 09:50:11"),
    updatedAt: moment().format("2021-08-12 09:50:11"),
    category: 1,
    kind: 1,
    open: 0,
    popupOpen: 1,
    clientOrder: 2,
    language: 1,
    title: "아이템 정보는 어디서 확인하나요?",
    html: html,
    isFaq: true,
  },
];
