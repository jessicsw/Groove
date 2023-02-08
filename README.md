## Groove

Groove is a Spotify-inspired music streaming web application that includes features such as registration and login, song discovery, and music library. 

Check out the demo [here](https://groove-delta.vercel.app/).

Groove utilizes the following:

* NextJS
* React
* PostgreSQL
* Prisma
* Typescript
* TailwindCSS
* SWR
* Easy Peasy
* bcrypt

<p align="center">
  <img width="650" height="300" src="/demo/home.png"/>
</p>


## Features
This application is composed of several primary features:

### User Authentication and Authorization

bcrypt is implemented to hash user passwords for secure storage within Groove's database.

On the user-end, a cookie holding a bcrypt session token is utilized to maintain the user's current session. In the case of non-matching session tokens, Groove's middleware will redirect the user to the login page. 

```typescript
export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const salt = bcrypt.genSaltSync();
  const { email, password, firstName, lastName } = req.body;

  let user;

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
        firstName,
        lastName,
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: `User already exists: ${e}` });
    return;
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    "hello",
    { expiresIn: "8h" }
  );

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("GROOVE_ACCESS_TOKEN", token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );

  res.json(user);
}
```

```typescript
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
};

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("GROOVE_ACCESS_TOKEN")?.value;
  const authPage = new URL("/login", req.url);
  if (!token) {
    return NextResponse.redirect(authPage);
  }
}
```

### Search

Groove's full-text search utilizes Prisma's native querying capabilities under the hood for PostgreSQL. With full-text search, results are ranked and sorted based on their relative similarity to the user's query.

<p align="center">
  <img width="650" height="300" src="/demo/search.gif"/>
</p>

### Playlists

Users may create a new playlist or add a new song to an existing playlist. With SWR, Groove is able to mutate the client-side cache to immediately update the UI, then send the fetch request, and finally replace the cache with up-to-date data. 

```javascript
const Sidebar = () => {
  // Creates a key value pair in the cache where the key is the URL of the API and the value is the returned data from fetchPlaylists
  const {
    data: playlists,
    mutate: mutatePlaylists,
    isLoading,
  } = useSWR("/api/playlist", fetchPlaylists);
  const router = useRouter();

  const handleCreatePlaylist: MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    // Creates a temporary ID for the new playlist
    const tempId = uuidv4();

    if (playlists) {
      const newPlaylist = {
        name: `Playlist #${playlists.length + 1}`,
      };

      try {
        // Updates client-side cache with the new playlist object to immediately display new playlist in the UI
        mutatePlaylists((playlists) => {
          return [
            ...(playlists as Playlist[]),
            { ...newPlaylist, id: tempId },
          ] as Playlist[];
        }, false);

        // POST request to create a new playlist in the database
        const json = await addPlaylist(newPlaylist);

        // Updates client-side cache using the canonical ID from the server json response
        mutatePlaylists(
          (playlists) =>
            playlists?.map((playlist) => {
              return `${playlist.id}` === tempId ? json : playlist;
            }) as Playlist[],
          false
        );
        router.push(`/playlist/${json.id}`);
      } catch (error) {
        console.error("Error with mutating playlist");
      }
    }
  };
  // ....
}
```

### Liked Songs

Users may like songs by clicking the heart icon and find them under "Liked Songs" in the left side navigation bar.

<p align="center">
  <img width="650" height="300" src="/demo/liked-songs.gif"/>
</p>

## Installation

### Clone

```bash
https://github.com/jessicsw/Groove.git
```

### Setup

Install project dependencies:

```bash
npm i
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see Groove in action.

# Future Releases

- [ ] Connect with Spotify API
- [ ] Artist pages
- [ ] Mobile/responsive app
