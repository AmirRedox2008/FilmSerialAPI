const genres = [
  { name: 'اکشن', slug: 'action' },
  { name: 'درام', slug: 'drama' },
  { name: 'علمی‌تخیلی', slug: 'sci-fi' },
  { name: 'جنایی', slug: 'crime' },
  { name: 'هیجان‌انگیز', slug: 'thriller' },
  { name: 'کمدی', slug: 'comedy' },
  { name: 'ماجراجویی', slug: 'adventure' },
  { name: 'انیمیشن', slug: 'animation' },
  { name: 'فانتزی', slug: 'fantasy' },
  { name: 'عاشقانه', slug: 'romance' },
  { name: 'تاریخی', slug: 'history' },
  { name: 'رازآلود', slug: 'mystery' }
]

const users = [
  { name: 'مدیر فیلم‌لند', email: 'admin@filmland.ir', password: 'admin1234', role: 'admin' },
  { name: 'علی محمدی', email: 'ali@filmland.ir', password: 'ali12345', role: 'user' },
  { name: 'سارا احمدی', email: 'sara@filmland.ir', password: 'sara12345', role: 'user' }
]

const movies = [
  {
    type: 'movie',
    posterSlug: 'inception',
    title: 'تلقین',
    originalTitle: 'Inception',
    year: 2010,
    duration: 148,
    country: 'آمریکا',
    rating: 8.8,
    votes: 2400000,
    featured: true,
    genreSlugs: ['action', 'sci-fi', 'thriller'],
    cast: [
      { name: 'Leonardo DiCaprio', character: 'Dom Cobb' },
      { name: 'Joseph Gordon-Levitt', character: 'Arthur' },
      { name: 'Elliot Page', character: 'Ariadne' },
      { name: 'Tom Hardy', character: 'Eames' },
      { name: 'Ken Watanabe', character: 'Saito' },
      { name: 'Cillian Murphy', character: 'Robert Fischer' }
    ],
    description: 'دام کاب حرفه‌ای‌ترین فرد در زمینه دزدیدن رازها از ذهن مردم در حال خوابه. این بار اما مأموریتی برعکس بهش پیشنهاد می‌شه: کاشت یک ایده در ذهن فرد دیگه. برای این کار باید به عمیق‌ترین لایه‌های ناخودآگاه سفر کنه؛ جایی که مرز میان واقعیت و رویا گم می‌شه.'
  },
  {
    type: 'movie',
    posterSlug: 'dark-knight',
    title: 'شوالیه تاریکی',
    originalTitle: 'The Dark Knight',
    year: 2008,
    duration: 152,
    country: 'آمریکا',
    rating: 9.0,
    votes: 2800000,
    genreSlugs: ['action', 'crime', 'drama'],
    cast: [
      { name: 'Christian Bale', character: 'Bruce Wayne / Batman' },
      { name: 'Heath Ledger', character: 'Joker' },
      { name: 'Gary Oldman', character: 'James Gordon' },
      { name: 'Aaron Eckhart', character: 'Harvey Dent' },
      { name: 'Maggie Gyllenhaal', character: 'Rachel Dawes' }
    ],
    description: 'بتمن با کمک فرمانده گوردن و دادستان هاروی دنت، گاتهام رو به سوی آینده‌ای بدون جرم پیش می‌بره. اما ورود یک آشوبگر به نام جوکر همه چیز رو وارونه می‌کنه و مفهوم قهرمان بودن رو به شدت محک می‌زنه.'
  },
  {
    type: 'movie',
    posterSlug: 'interstellar',
    title: 'میان‌ستاره‌ای',
    originalTitle: 'Interstellar',
    year: 2014,
    duration: 169,
    country: 'آمریکا',
    rating: 8.7,
    votes: 2100000,
    featured: true,
    genreSlugs: ['sci-fi', 'drama', 'adventure'],
    cast: [
      { name: 'Matthew McConaughey', character: 'Cooper' },
      { name: 'Anne Hathaway', character: 'Amelia Brand' },
      { name: 'Jessica Chastain', character: 'Murph' },
      { name: 'Michael Caine', character: 'Professor Brand' }
    ],
    description: 'زمین رو به مرگه و محصولات کشاورزی یکی پس از دیگری نابود می‌شن. کوپر، خلبان سابق ناسا، برای پیدا کردن خانه‌ای جدید برای بشریت راهی سفر میان‌ستاره‌ای می‌شه؛ سفری که ممکنه دیگه به دخترش برنگرده.'
  },
  {
    type: 'movie',
    posterSlug: 'parasite',
    title: 'انگل',
    originalTitle: 'Parasite',
    year: 2019,
    duration: 132,
    country: 'کره جنوبی',
    rating: 8.5,
    votes: 900000,
    genreSlugs: ['drama', 'thriller', 'comedy'],
    cast: [
      { name: 'Song Kang-ho', character: 'Kim Ki-taek' },
      { name: 'Jang Hye-jin', character: 'Kim Chung-sook' },
      { name: 'Lee Sun-kyun', character: 'Park Dong-ik' },
      { name: 'Cho Yeo-jeong', character: 'Park Yeon-kyo' }
    ],
    description: 'خانواده‌ای فقیر با نیرنگ‌های مختلف وارد خدمت خانواده‌ای ثروتمند می‌شن. اما خانواده ارباب رازی داره که زندگی هر دو خانواده رو برای همیشه تغییر می‌ده. ساتیری تند درباره فاصله طبقاتی.'
  },
  {
    type: 'movie',
    posterSlug: 'matrix',
    title: 'ماتریکس',
    originalTitle: 'The Matrix',
    year: 1999,
    duration: 136,
    country: 'آمریکا',
    rating: 8.7,
    votes: 2000000,
    genreSlugs: ['sci-fi', 'action'],
    cast: [
      { name: 'Keanu Reeves', character: 'Neo' },
      { name: 'Laurence Fishburne', character: 'Morpheus' },
      { name: 'Carrie-Anne Moss', character: 'Trinity' },
      { name: 'Hugo Weaving', character: 'Agent Smith' }
    ],
    description: 'توماس اندرسون، برنامه‌نویسی که شب‌ها با نام نئو هک می‌کنه، همیشه حس می‌کرده دنیا یه جای دیگه‌ست. وقتی با مرفئوس آشنا می‌شه، حقیقت تلخی درباره واقعیت کشف می‌کنه و باید بین زندگی آرام و مبارزه برای آزادی بشریت یکی رو انتخاب کنه.'
  },
  {
    type: 'movie',
    posterSlug: 'fight-club',
    title: 'باشگاه مشت‌زنی',
    originalTitle: 'Fight Club',
    year: 1999,
    duration: 139,
    country: 'آمریکا',
    rating: 8.8,
    votes: 2300000,
    genreSlugs: ['drama', 'thriller'],
    cast: [
      { name: 'Edward Norton', character: 'The Narrator' },
      { name: 'Brad Pitt', character: 'Tyler Durden' },
      { name: 'Helena Bonham Carter', character: 'Marla Singer' },
      { name: 'Meat Loaf', character: 'Bob' }
    ],
    description: 'کارمند بیمه‌ای که از زندگی ماشینی‌ش خسته شده، با مردی جذاب به نام تایلر دردن آشنا می‌شه و با هم یه باشگاه مخفی مشت‌زنی راه می‌اندازن. اما به‌زودی این باشگاه به چیزی خیلی بزرگ‌تر و خطرناک‌تر تبدیل می‌شه.'
  },
  {
    type: 'movie',
    posterSlug: 'pulp-fiction',
    title: 'داستان عامه‌پسند',
    originalTitle: 'Pulp Fiction',
    year: 1994,
    duration: 154,
    country: 'آمریکا',
    rating: 8.9,
    votes: 2100000,
    genreSlugs: ['crime', 'drama'],
    cast: [
      { name: 'John Travolta', character: 'Vincent Vega' },
      { name: 'Samuel L. Jackson', character: 'Jules Winnfield' },
      { name: 'Uma Thurman', character: 'Mia Wallace' },
      { name: 'Bruce Willis', character: 'Butch Coolidge' }
    ],
    description: 'قصه‌های به‌ظاهر بی‌ربط چند شخصیت در دنیای تبهکاری لس‌آنجلس، از دو گانگستر که کارهای روزمره شغلی‌شون رو انجام می‌دن تا بوکسوری که حاضر نیست باخته، به شکل هوشمندانه‌ای در هم تنیده می‌شه.'
  },
  {
    type: 'movie',
    posterSlug: 'godfather',
    title: 'پدرخوانده',
    originalTitle: 'The Godfather',
    year: 1972,
    duration: 175,
    country: 'آمریکا',
    rating: 9.2,
    votes: 1900000,
    genreSlugs: ['crime', 'drama'],
    cast: [
      { name: 'Marlon Brando', character: 'Vito Corleone' },
      { name: 'Al Pacino', character: 'Michael Corleone' },
      { name: 'James Caan', character: 'Sonny Corleone' },
      { name: 'Robert Duvall', character: 'Tom Hagen' },
      { name: 'Diane Keaton', character: 'Kay Adams' }
    ],
    description: 'داستان خانواده کورلئونه، یکی از قدرتمندترین خانواده‌های مافیا در نیویورک. مایکل، پسر کوچک خانواده که قصد داشت از کسب‌وکار خانوادگی دور بمونه، ناچار می‌شه وارد دنیای خون و قدرت بشه.'
  },
  {
    type: 'movie',
    posterSlug: 'whiplash',
    title: 'شلاق',
    originalTitle: 'Whiplash',
    year: 2014,
    duration: 107,
    country: 'آمریکا',
    rating: 8.5,
    votes: 950000,
    genreSlugs: ['drama', 'thriller'],
    cast: [
      { name: 'Miles Teller', character: 'Andrew Neiman' },
      { name: 'J.K. Simmons', character: 'Terence Fletcher' },
      { name: 'Paul Reiser', character: 'Jim Neiman' },
      { name: 'Melissa Benoist', character: 'Nicole' }
    ],
    description: 'اندرو جوان، درامر دانشکده موسیقی معتبر شایستر، روزها تمرین می‌کنه تا بهترین بشه. استاد فرچر اما با روش‌های تحقیرآمیز و بی‌رحمانه، مرز میان جاه‌طلبی و نابودی رو جابه‌جا می‌کنه.'
  },
  {
    type: 'movie',
    posterSlug: 'joker',
    title: 'جوکر',
    originalTitle: 'Joker',
    year: 2019,
    duration: 122,
    country: 'آمریکا',
    rating: 8.4,
    votes: 1500000,
    genreSlugs: ['crime', 'drama', 'thriller'],
    cast: [
      { name: 'Joaquin Phoenix', character: 'Arthur Fleck' },
      { name: 'Robert De Niro', character: 'Murray Franklin' },
      { name: 'Zazie Beetz', character: 'Sophie Dumond' },
      { name: 'Frances Conroy', character: 'Penny Fleck' }
    ],
    description: 'آرتور فلک، کمدینی شکست‌خورده در گاتهام، به‌خاطر بیماری‌ش همیشه مورد تمسخر جامعه‌ست. بی‌توجهی جامعه و سیل بدبختی‌ها کم‌کم اون رو به سوی تبدیل‌شدن به نماد آشوب سوق می‌ده.'
  },
  {
    type: 'movie',
    posterSlug: 'dune',
    title: 'تلماسه',
    originalTitle: 'Dune',
    year: 2021,
    duration: 155,
    country: 'آمریکا',
    rating: 8.0,
    votes: 850000,
    featured: true,
    genreSlugs: ['sci-fi', 'adventure', 'drama'],
    cast: [
      { name: 'Timothée Chalamet', character: 'Paul Atreides' },
      { name: 'Rebecca Ferguson', character: 'Lady Jessica' },
      { name: 'Oscar Isaac', character: 'Duke Leto' },
      { name: 'Jason Momoa', character: 'Duncan Idaho' },
      { name: 'Zendaya', character: 'Chani' }
    ],
    description: 'پل آتریدیس، وارث خاندانی قدرتمند، برای تصاحب خطرناک‌ترین سیاره کهکشان به نام اراکیس سفر می‌کنه؛ جایی که تنها منبع باارزش دنیا یعنی ادویه تولید می‌شه و توطئه‌هایی برای نابودی خانواده‌ش در جریانه.'
  },
  {
    type: 'movie',
    posterSlug: 'django',
    title: 'جانگ آزادشده',
    originalTitle: 'Django Unchained',
    year: 2012,
    duration: 165,
    country: 'آمریکا',
    rating: 8.5,
    votes: 1600000,
    genreSlugs: ['action', 'drama', 'crime'],
    cast: [
      { name: 'Jamie Foxx', character: 'Django' },
      { name: 'Christoph Waltz', character: 'Dr. King Schultz' },
      { name: 'Leonardo DiCaprio', character: 'Calvin Candie' },
      { name: 'Kerry Washington', character: 'Broomhilda' },
      { name: 'Samuel L. Jackson', character: 'Stephen' }
    ],
    description: 'دو سال پیش از جنگ داخلی آمریکا، بردگای سابقی به نام جانگ با دندان‌پزشک آلمانی‌ای متحد می‌شه تا همسرش رو از دست مالک بی‌رحم مزرعه نجات بدن. راهی که انتخاب می‌کنن پر از خطر و انتقامه.'
  },
  {
    type: 'movie',
    posterSlug: 'wolf-wall-street',
    title: 'گرگ وال‌استریت',
    originalTitle: 'The Wolf of Wall Street',
    year: 2013,
    duration: 180,
    country: 'آمریکا',
    rating: 8.2,
    votes: 1500000,
    genreSlugs: ['comedy', 'crime', 'drama'],
    cast: [
      { name: 'Leonardo DiCaprio', character: 'Jordan Belfort' },
      { name: 'Jonah Hill', character: 'Donnie Azoff' },
      { name: 'Margot Robbie', character: 'Naomi Lapaglia' },
      { name: 'Matthew McConaughey', character: 'Mark Hanna' }
    ],
    description: 'جردن بلفورت، کارگزاری جاه‌طلب، با کلاهبرداری‌های کلان در وال‌استریت ثروتی افسانه‌ای جمع می‌کنه و زندگی لوکسی رو می‌سازه. اما اف‌بی‌آی و زیاده‌خواهی خودش امپراتوری‌ش رو به سوی سقوط می‌بره.'
  },
  {
    type: 'movie',
    posterSlug: 'up',
    title: 'بالا',
    originalTitle: 'Up',
    year: 2009,
    duration: 96,
    country: 'آمریکا',
    rating: 8.3,
    votes: 1100000,
    genreSlugs: ['animation', 'adventure', 'comedy'],
    cast: [
      { name: 'Edward Asner', character: 'Carl Fredricksen' },
      { name: 'Jordan Nagai', character: 'Russell' },
      { name: 'Christopher Plummer', character: 'Charles Muntz' },
      { name: 'Bob Peterson', character: 'Dug' }
    ],
    description: 'کارل پیرمرد با بستن هزاران بادکنک به خونه‌ش به آرزوی قدیمی‌شون سفر می‌کنه؛ اما بی‌اختیار یه پیشاهنگ کوچولو هم سفر می‌شه و ماجراجویی‌ای غیرمنتظره در آمریکای جنوبی شروع می‌شه.'
  },
  {
    type: 'movie',
    posterSlug: 'coco',
    title: 'کوکو',
    originalTitle: 'Coco',
    year: 2017,
    duration: 105,
    country: 'آمریکا',
    rating: 8.4,
    votes: 600000,
    genreSlugs: ['animation', 'adventure', 'fantasy'],
    cast: [
      { name: 'Anthony Gonzalez', character: 'Miguel' },
      { name: 'Gael García Bernal', character: 'Héctor' },
      { name: 'Benjamin Bratt', character: 'Ernesto de la Cruz' },
      { name: 'Alanna Ubach', character: 'Mama Imelda' }
    ],
    description: 'میگل کوچولو با وجود مخالفت خانواده‌ش عاشق موسیقیه. در شب مرده‌ها به اشتباه به سرزمین مردگان می‌ره و برای برگشتن باید راز قدیمی خانواده‌ش رو کشف کنه.'
  },
  {
    type: 'movie',
    posterSlug: 'se7en',
    title: 'هفت',
    originalTitle: 'Se7en',
    year: 1995,
    duration: 127,
    country: 'آمریکا',
    rating: 8.6,
    votes: 1700000,
    genreSlugs: ['crime', 'mystery', 'thriller'],
    cast: [
      { name: 'Brad Pitt', character: 'David Mills' },
      { name: 'Morgan Freeman', character: 'William Somerset' },
      { name: 'Kevin Spacey', character: 'John Doe' },
      { name: 'Gwyneth Paltrow', character: 'Tracy Mills' }
    ],
    description: 'دو کارآگاه، یکی پیر و نزدیک بازنشستگی و دیگری جوان و تازه‌کار، شکار قاتلی زنجیره‌ای می‌شن که قتل‌هاش بر پایه هفت گناه کبیر طراحی شده. بازی ذهنی مرگباری که تا آخرین لحظه ادامه داره.'
  }
]

const series = [
  {
    type: 'series',
    posterSlug: 'breaking-bad',
    title: 'بریکینگ بد',
    originalTitle: 'Breaking Bad',
    year: 2008,
    duration: 49,
    country: 'آمریکا',
    rating: 9.5,
    votes: 2000000,
    featured: true,
    genreSlugs: ['crime', 'drama', 'thriller'],
    cast: [
      { name: 'Bryan Cranston', character: 'Walter White' },
      { name: 'Aaron Paul', character: 'Jesse Pinkman' },
      { name: 'Anna Gunn', character: 'Skyler White' },
      { name: 'Dean Norris', character: 'Hank Schrader' },
      { name: 'Giancarlo Esposito', character: 'Gus Fring' }
    ],
    description: 'والتر وایت، معلم شیمی مبتلا به سرطان ریه، برای تأمین آینده خانواده‌ش همراه با شاگرد سابقش جسی وارد دنیای تولید مت‌آمفتامین می‌شه. اما با هر قدم، بیشتر از بیماری‌ش خودش خطرناک می‌شه.',
    seasons: [
      { number: 1, episodes: ['Pilot', "Cat's in the Bag...", "...And the Bag's in the River", 'Cancer Man', 'Gray Matter', 'Crazy Handful of Nothin\'', 'A No-Rough-Stuff-Type Deal'] },
      { number: 2, episodes: ['Seven Thirty-Seven', 'Grilled', 'Bit by a Dead Bee', 'Peekaboo', 'Negro y Azul', 'Mandala'] }
    ]
  },
  {
    type: 'series',
    posterSlug: 'got',
    title: 'بازی تاج‌وتخت',
    originalTitle: 'Game of Thrones',
    year: 2011,
    duration: 57,
    country: 'آمریکا',
    rating: 9.2,
    votes: 2200000,
    genreSlugs: ['drama', 'fantasy', 'adventure'],
    cast: [
      { name: 'Emilia Clarke', character: 'Daenerys Targaryen' },
      { name: 'Kit Harington', character: 'Jon Snow' },
      { name: 'Peter Dinklage', character: 'Tyrion Lannister' },
      { name: 'Lena Headey', character: 'Cersei Lannister' },
      { name: 'Sean Bean', character: 'Ned Stark' }
    ],
    description: 'در سرزمین‌های هفت پادشاهی، خانواده‌های بزرگ برای نشستن بر تخت آهنین با هم می‌جنگن. در همین حال در آن سوی دیوار و شرق دور، خطرهای قدیمی دوباره بیدار می‌شن.',
    seasons: [
      { number: 1, episodes: ['Winter Is Coming', 'The Kingsroad', 'Lord Snow', 'Cripples, Bastards, and Broken Things', 'The Wolf and the Lion', 'A Golden Crown', 'You Win or You Die', 'The Pointy End'] },
      { number: 2, episodes: ['The North Remembers', 'The Night Lands', 'What Is Dead May Never Die', 'Garden of Bones', 'The Ghost of Harrenhal', 'The Old Gods and the New'] }
    ]
  },
  {
    type: 'series',
    posterSlug: 'stranger-things',
    title: 'چیزهای عجیب',
    originalTitle: 'Stranger Things',
    year: 2016,
    duration: 51,
    country: 'آمریکا',
    rating: 8.7,
    votes: 1400000,
    genreSlugs: ['sci-fi', 'drama', 'mystery'],
    cast: [
      { name: 'Millie Bobby Brown', character: 'Eleven' },
      { name: 'Finn Wolfhard', character: 'Mike Wheeler' },
      { name: 'David Harbour', character: 'Jim Hopper' },
      { name: 'Winona Ryder', character: 'Joyce Byers' },
      { name: 'Noah Schnapp', character: 'Will Byers' }
    ],
    description: 'در شهر کوچک هاوکینز، ناپدید شدن ناگهانی پسری مرموز، دوستانش و خانواده‌ش رو با رازهای دولتی، آزمایش‌های مخفی و نیرویی ماوراءطبیعی روبه‌رو می‌کنه.',
    seasons: [
      { number: 1, episodes: ['The Vanishing of Will Byers', 'The Weirdo on Maple Street', 'Holly, Jolly', 'The Body', 'The Flea and the Acrobat', 'The Monster', 'The Bathtub', 'The Upside Down'] },
      { number: 2, episodes: ['MADMAX', 'Trick or Treat, Dude', 'The Pollywog', 'Will the Wise', 'Dig Dug', 'The Spy'] }
    ]
  },
  {
    type: 'series',
    posterSlug: 'chernobyl',
    title: 'چرنوبیل',
    originalTitle: 'Chernobyl',
    year: 2019,
    duration: 65,
    country: 'انگلستان',
    rating: 9.4,
    votes: 900000,
    genreSlugs: ['drama', 'history', 'thriller'],
    cast: [
      { name: 'Jared Harris', character: 'Valery Legasov' },
      { name: 'Stellan Skarsgård', character: 'Boris Shcherbina' },
      { name: 'Emily Watson', character: 'Ulana Khomyuk' },
      { name: 'Paul Ritter', character: 'Anatoly Dyatlov' }
    ],
    description: 'بازسازی وقایع فاجعه هسته‌ای چرنوبیل در سال ۱۹۸۶ و تلاش مردان و زنانی که جان خودشون رو برای مهار فاجعه فدا کردن. پرده از دروغ‌هایی برداشته می‌شه که هزینه‌ش رو هزاران نفر پرداختن.',
    seasons: [
      { number: 1, episodes: ['1:23:45', 'Please Remain Calm', 'Open Wide, O Earth', 'The Happiness of All Mankind', 'Vichnaya Pamyat'] }
    ]
  },
  {
    type: 'series',
    posterSlug: 'dark-netflix',
    title: 'دارک',
    originalTitle: 'Dark',
    year: 2017,
    duration: 56,
    country: 'آلمان',
    rating: 8.7,
    votes: 600000,
    genreSlugs: ['sci-fi', 'mystery', 'drama'],
    cast: [
      { name: 'Louis Hofmann', character: 'Jonas Kahnwald' },
      { name: 'Lisa Vicari', character: 'Martha Nielsen' },
      { name: 'Oliver Masucci', character: 'Ulrich Nielsen' },
      { name: 'Maja Schöne', character: 'Hannah Kahnwald' }
    ],
    description: 'در شهر کوچک ویندن، ناپدید شدن کودکان راز خانواده‌های چهارگانه رو آشکار می‌کنه؛ رازی که به سفر در زمان و پیوندهای پیچیده‌ای بین گذشته و آینده مربوطه.',
    seasons: [
      { number: 1, episodes: ['Secrets', 'Lies', 'Past and Present', 'Double Lives', 'Truths', 'Sic Mundus Creatus Est'] },
      { number: 2, episodes: ['Beginnings and Endings', 'Dark Matter', 'Lost and Found', 'The Travelers'] }
    ]
  },
  {
    type: 'series',
    posterSlug: 'peaky-blinders',
    title: 'پیکی بلایندرز',
    originalTitle: 'Peaky Blinders',
    year: 2013,
    duration: 58,
    country: 'انگلستان',
    rating: 8.8,
    votes: 800000,
    genreSlugs: ['crime', 'drama'],
    cast: [
      { name: 'Cillian Murphy', character: 'Thomas Shelby' },
      { name: 'Helen McCrory', character: 'Polly Gray' },
      { name: 'Paul Anderson', character: 'Arthur Shelby' },
      { name: 'Annabelle Wallis', character: 'Grace Burgess' }
    ],
    description: 'باند پیکی بلایندرز به رهبری تامی شلبی در بیرمنگام پس از جنگ جهانی اول، از شرط‌بندی اسب‌دوانی تا تجارت جهانی پیش می‌ره؛ اما قدرت جدید دشمنان خطرناکی هم میاره.',
    seasons: [
      { number: 1, episodes: ['Episode 1', 'Episode 2', 'Episode 3', 'Episode 4', 'Episode 5', 'Episode 6'] },
      { number: 2, episodes: ['Episode 1', 'Episode 2', 'Episode 3', 'Episode 4', 'Episode 5'] }
    ]
  },
  {
    type: 'series',
    posterSlug: 'last-of-us',
    title: 'آخرین بازمانده از ما',
    originalTitle: 'The Last of Us',
    year: 2023,
    duration: 55,
    country: 'آمریکا',
    rating: 8.7,
    votes: 650000,
    genreSlugs: ['drama', 'adventure', 'thriller'],
    cast: [
      { name: 'Pedro Pascal', character: 'Joel Miller' },
      { name: 'Bella Ramsey', character: 'Ellie Williams' },
      { name: 'Anna Torv', character: 'Tess Servopoulos' },
      { name: 'Nick Offerman', character: 'Bill' }
    ],
    description: 'دو دهه پس از نابودی تمدن به‌خاطر شیوع قارچی مهلک، قاچاقچی سختی به نام جوئل مأمور می‌شه دختر نوجوانی به نام الی رو از منطقه قرنطینه عبور بده؛ سفری که شاید کلید نجات بشریت باشه.',
    seasons: [
      { number: 1, episodes: ['When You\'re Lost in the Darkness', 'Infected', 'Long, Long Time', 'Please Hold to My Hand', 'Endure and Survive', 'Look for the Light'] }
    ]
  },
  {
    type: 'series',
    posterSlug: 'squid-game',
    title: 'بازی ماهی مرکبی',
    originalTitle: 'Squid Game',
    year: 2021,
    duration: 54,
    country: 'کره جنوبی',
    rating: 8.0,
    votes: 1300000,
    genreSlugs: ['drama', 'thriller', 'mystery'],
    cast: [
      { name: 'Lee Jung-jae', character: 'Seong Gi-hun' },
      { name: 'Park Hae-soo', character: 'Cho Sang-woo' },
      { name: 'Jung Ho-yeon', character: 'Kang Sae-byeok' },
      { name: 'Lee Byung-hun', character: 'The Front Man' }
    ],
    description: 'صد نفر بدهکار برای برنده‌شدن جایزه‌ای کلان در بازی‌های کودکانه شرکت می‌کنن؛ اما باخت یعنی مرگ. هر بازی، مرزهای اخلاقی‌شون رو محک می‌زنه.',
    seasons: [
      { number: 1, episodes: ['Red Light, Green Light', 'Hell', 'The Man with the Umbrella', 'Stick to the Team', 'A Fair World', 'Gganbu'] }
    ]
  },
  {
    type: 'series',
    posterSlug: 'friends',
    title: 'فرندز',
    originalTitle: 'Friends',
    year: 1994,
    duration: 22,
    country: 'آمریکا',
    rating: 8.9,
    votes: 1100000,
    genreSlugs: ['comedy', 'romance'],
    cast: [
      { name: 'Jennifer Aniston', character: 'Rachel Green' },
      { name: 'Courteney Cox', character: 'Monica Geller' },
      { name: 'Lisa Kudrow', character: 'Phoebe Buffay' },
      { name: 'Matt LeBlanc', character: 'Joey Tribbiani' },
      { name: 'Matthew Perry', character: 'Chandler Bing' },
      { name: 'David Schwimmer', character: 'Ross Geller' }
    ],
    description: 'شش دوست جوان در منهتن با هم زندگی، عشق و دردسرهای بزرگسالی رو تجربه می‌کنن؛ از کافه سنترال پرک تا آپارتمان‌های کوچیک‌شون.',
    seasons: [
      { number: 1, episodes: ['The One Where Monica Gets a Roommate', 'The One with the Sonogram at the End', 'The One with the Thumb', 'The One with George Stephanopoulos', 'The One with the East German Laundry Detergent', 'The One with the Butt'] },
      { number: 2, episodes: ['The One with Ross\'s New Girlfriend', 'The One with the Breast Milk', 'The One Where Heckles Dies', 'The One with Phoebe\'s Husband', 'The One with Five Steaks and an Eggplant', 'The One with the Baby on the Bus'] }
    ]
  },
  {
    type: 'series',
    posterSlug: 'mr-robot',
    title: 'آقای ربات',
    originalTitle: 'Mr. Robot',
    year: 2015,
    duration: 49,
    country: 'آمریکا',
    rating: 8.5,
    votes: 600000,
    genreSlugs: ['crime', 'drama', 'thriller'],
    cast: [
      { name: 'Rami Malek', character: 'Elliot Alderson' },
      { name: 'Christian Slater', character: 'Mr. Robot' },
      { name: 'Carly Chaikin', character: 'Darlene' },
      { name: 'Portia Doubleday', character: 'Angela Moss' }
    ],
    description: 'الیوت، مهندس امنیت سایبری با مشکلات روانی، روزها برای شرکت‌ها کار می‌کنه و شب‌ها به‌عنوان هکر به اون‌ها حمله می‌کنه. تا وقتی گروهی زیرزمینی به نام fsociety ازش می‌خواد به بزرگ‌ترین شرکت‌های دنیا ضربه بزنه.',
    seasons: [
      { number: 1, episodes: ['eps1.0_hellofriend.mov', 'eps1.1_ones-and-zer0es.mpeg', 'eps1.2_d3bug.mkv', 'eps1.3_da3m0ns.mp4', 'eps1.4_3xpl0its.wmv', 'eps1.5_br4ve-trave1er.asf'] },
      { number: 2, episodes: ['eps2.0_unm4sk-pt2.tc', 'eps2.1_k3rnel-pan1c.ksd', 'eps2.2_init_1.asec', 'eps2.3_logic-b0mb.hc', 'eps2.4_m4ster-s1ave.aes', 'eps2.5_h4ndshake.sme'] }
    ]
  }
]

const reviews = [
  { email: 'ali@filmland.ir', slug: 'inception', body: 'بهترین تجربه سینمایی عمرم. هر بار که می‌بینم یه چیز جدید توش کشف می‌کنم. بازیگرها و فیلمنامه‌ش فوق‌العاده‌ست.', daysAgo: 12 },
  { email: 'ali@filmland.ir', slug: 'breaking-bad', body: 'از اون سریال‌هایی که واقعاً ارزش دیدن داره. بازی برایان کرنستون توی نقش والتر وایت باورنکردنیه.', daysAgo: 8 },
  { email: 'ali@filmland.ir', slug: 'joker', body: 'جوایکوین فینیکس شاهکار ارائه داد. فیلم سنگینیه ولی حتماً باید ببینید.', daysAgo: 5 },
  { email: 'sara@filmland.ir', slug: 'interstellar', body: 'آخرش کلی گریه کردم. موسیقی هانس زیمر آدم رو می‌لرزونه. بهترین فیلم علمی‌تخیلی تاریخ به نظرم.', daysAgo: 10 },
  { email: 'sara@filmland.ir', slug: 'dark-netflix', body: 'حتماً با تمرکز ببینید چون خیلی ذهنیه و هر سکانسش به هم وصله. یکی از باهوش‌ترین سریال‌هایی که دیدم.', daysAgo: 6 },
  { email: 'sara@filmland.ir', slug: 'got', body: 'فصل اولش بی‌نقصه. اون شخصیت‌پردازی‌ها رو هیچ سریالی تکرار نکرده. به جز فصل آخرش که بی‌خیال.', daysAgo: 3 },
  { email: 'sara@filmland.ir', slug: 'parasite', body: 'بونگ جون-هو با این فیلم ثابت کرد که یکی از بهترین کارگردان‌های دنیاست. تا آخرین دقیقه نمی‌دونی چی انتظارت رو می‌کشه.', daysAgo: 2 }
]

const ratings = [
  { email: 'ali@filmland.ir', slug: 'inception', score: 10 },
  { email: 'ali@filmland.ir', slug: 'breaking-bad', score: 10 },
  { email: 'ali@filmland.ir', slug: 'got', score: 9 },
  { email: 'ali@filmland.ir', slug: 'joker', score: 9 },
  { email: 'ali@filmland.ir', slug: 'dune', score: 8 },
  { email: 'sara@filmland.ir', slug: 'interstellar', score: 10 },
  { email: 'sara@filmland.ir', slug: 'dark-netflix', score: 9 },
  { email: 'sara@filmland.ir', slug: 'parasite', score: 9 },
  { email: 'sara@filmland.ir', slug: 'breaking-bad', score: 9 },
  { email: 'sara@filmland.ir', slug: 'friends', score: 8 },
  { email: 'sara@filmland.ir', slug: 'squid-game', score: 7 }
]

const favorites = [
  { email: 'ali@filmland.ir', slug: 'inception', daysAgo: 14 },
  { email: 'ali@filmland.ir', slug: 'breaking-bad', daysAgo: 9 },
  { email: 'ali@filmland.ir', slug: 'interstellar', daysAgo: 4 },
  { email: 'sara@filmland.ir', slug: 'dark-netflix', daysAgo: 7 },
  { email: 'sara@filmland.ir', slug: 'got', daysAgo: 5 },
  { email: 'sara@filmland.ir', slug: 'dune', daysAgo: 1 }
]

module.exports = { genres, users, movies, series, reviews, ratings, favorites }
