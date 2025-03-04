"use client";
import React, { useState, useEffect, useCallback } from "react";
import globe from "../../public/globe.svg";
import { comment } from "postcss";
import { Suspense, use } from "react";
const Componet = React.lazy(() => import("../components/MemoryBoard"));

const fetchData = () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Data Loaded"), 2000)
  );
};

// ✅ Using `use()` (React 19+)

function DataComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  if (!data) return <div>Loading data...</div>;

  return <div>{data}</div>;
}

export default function Page() {
  return (
    <>
      {
        <Suspense fallback={<div>Loading components...</div>}>
          <Componet />
        </Suspense>
      }
    </>
    // <Suspense fallback={<div>Loading data...</div>}>
  );
}

let postData = [
  {
    postName: "dinesh",
    postImage: "./globe.svg",
    postComments: [
      {
        comment: "nice",
        replies: [
          {
            comment: "ur right",
          },
        ],
      },
      {
        comment: "gret",
        replies: [
          {
            comment: "ur right",
            replies: [{ name: "yess" }],
          },
        ],
      },
    ],
  },
];

function Post({ img, caption, likes, comments }) {
  return (
    <div className="container h-[500px] w-[500px] border m-10 text-center">
      <img className="w-1/2 h-1/2 mx-auto" src={"./globe.svg"}></img>
      <h2>{caption}</h2>
      {comments &&
        comments.map((com, index) => {
          return <Comments key={index} com={com} />;
        })}
      {/* <span>dinesh</span> */}
    </div>
  );
}

function Comments({ com }) {
  const [show, setShowcomments] = useState(false);
  const meoSet = useCallback(() => {
    setShowcomments((prev) => {
      return !prev;
    });
  }, []);
  return (
    <div className="container">
      <div className="flex justify-center gap-5">
        <h2>{com.comment}</h2>
        <span onClick={meoSet}>Show replies</span>
      </div>
      {com.replies && show
        ? com.replies.map((com, index) => {
            return <Comments key={index} com={com} />;
          })
        : ""}
    </div>
  );
}
// function PokemonCard({ pokemon = "" }) {
//   const [pokemonManagement, setPokemonManagement] = useState({
//     pokemonData: null,
//     status: "idle",
//     error: null,
//   });
//   const { pokemonData, status, error } = pokemonManagement;

//   //this is a side effect
//   useEffect(() => {
//     async function fetchPokemon() {
//       console.log("fetching pokemon");
//       if (!pokemon) {
//         setPokemonManagement({
//           pokemonData: null,
//           status: "idle",
//           error: null,
//         });
//         return;
//       }
//       // make isLoading true
//       setPokemonManagement({
//         status: "pending",
//       });
//       // fetch the pokemon
//       try {
//         const response = await fetch(
//           `https://pokeapi.co/api/v2/pokemon/${pokemon}`
//         );
//         const data = await response.json();
//         setPokemonManagement({
//           ...pokemonManagement,
//           pokemonData: data,
//           status: "success",
//           error: null,
//         });
//       } catch (err) {
//         setPokemonManagement({
//           pokemonData: null,
//           status: "rejected",
//           error: err,
//         });
//       }
//     }
//     let timer = setTimeout(() => {
//       fetchPokemon();
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, [pokemon]);

//   if (status === "idle") {
//     return (
//       <div>
//         <h1>write a pokemon name</h1>
//       </div>
//     );
//   } else if (status === "pending") {
//     return (
//       <div>
//         <h1>Loading...</h1>
//       </div>
//     );
//   } else if (status === "rejected") {
//     return (
//       <div>
//         <h1>Error: {error.message}</h1>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex mt-10 flex-col items-center justify-center border border-gray-300 rounded-md p-2 shadow-md">
//         <h1 className="text-2xl font-bold">{pokemonData.name}</h1>
//         <img
//           className="w-100 h-100 rounded-md"
//           src={pokemonData?.sprites?.front_default}
//           alt={pokemonData?.name}
//         />
//         <p className="text-sm">Height: {pokemonData?.height}</p>
//         <p className="text-sm">Weight: {pokemonData.weight}</p>
//         <p className="text-sm">
//           Base Experience: {pokemonData.base_experience}
//         </p>
//       </div>
//     </div>
//   );
// }

//  const  ItemList = React.memo(({ items })=> {
//   console.log("ItemList rendered");
//   return items.map((item, index) => <div key={index}>{item}</div>);
// })

// export default function App() {
//   const [theme, setTheme] = useState("light");

//   const items = useMemo(()=>["Apple", "Banana", "Cherry"],[])
//   return (
//     <div>
//       <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
//         Toggle Theme
//       </button>
//       <ItemList items={items} />
//     </div>
//   );
// }
