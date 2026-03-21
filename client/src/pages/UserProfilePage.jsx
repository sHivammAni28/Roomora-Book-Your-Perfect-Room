// import React from "react";
// import { cities } from "../assets/assets";

// const UserProfilePage = () => {
//   const [role, setRole] = React.useState("");
//   const [recentSearchedCities, setRecentSearchedCities] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState("");

//   const [recentSearchedCity, setRecentSearchedCity] = React.useState("");
//   const [saving, setSaving] = React.useState(false);
//   const [saveMessage, setSaveMessage] = React.useState("");

//   // React.useEffect(() => {
//   //   let cancelled = false

//   //   async function load() {
//   //     setLoading(true)
//   //     setError('')
//   //     try {
//   //       const data = await apiFetch('/api/user')
//   //       if (!data?.success) throw new Error(data?.message || 'Failed to load user data')
//   //       if (!cancelled) {
//   //         setRole(data.role || '')
//   //         setRecentSearchedCities(Array.isArray(data.recentSearchedCities) ? data.recentSearchedCities : [])
//   //       }
//   //     } catch (e) {
//   //       if (!cancelled) {
//   //         setRole('')
//   //         setRecentSearchedCities([])
//   //         // setError(e?.message || 'Failed to load user data.')
//   //       }
//   //     } finally {
//   //       if (!cancelled) setLoading(false)
//   //     }
//   //   }

//   //   load()
//   //   return () => {
//   //     cancelled = true
//   //   }
//   // }, [])

//   async function onSaveRecentSearch() {
//     setSaveMessage("");
//     if (!recentSearchedCity) {
//       setSaveMessage("Please select a city.");
//       return;
//     }

//     setSaving(true);
//     try {
//       // Backend expects: { recentSearchedCity }
//       // This page will use AppContext helpers; leaving local state update as placeholder
//       setSaveMessage("City added");
//       setRecentSearchedCities((prev) => {
//         const next = [...prev];
//         if (next.length < 3) next.push(recentSearchedCity);
//         else {
//           next.shift();
//           next.push(recentSearchedCity);
//         }
//         return next;
//       });
//     } catch (e) {
//       setSaveMessage(
//         e?.message ||
//           "Failed to store recent search (authentication required).",
//       );
//     } finally {
//       setSaving(false);
//     }
//   }

//   return (
//     <main className="px-4 md:px-16 lg:px-24 xl:px-32 py-8">
//       <h1 className="text-2xl font-semibold">Profile</h1>
//       <p className="text-sm text-gray-600 mt-1">
//         User role and recent searched cities.
//       </p>

//       {loading && <div className="mt-6 text-gray-600">Loading...</div>}

//       {!loading && error && (
//         <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm">
//           {error}
//         </div>
//       )}

//       {!loading && (
//         <div className="mt-6 grid gap-4">
//           <div className="rounded-2xl border border-gray-100 bg-white p-4">
//             <div className="text-sm text-gray-500">Role</div>
//             <div className="font-medium mt-1">{role || "user"}</div>
//           </div>

//           <div className="rounded-2xl border border-gray-100 bg-white p-4">
//             <div className="font-medium">Recent searched cities</div>
//             <div className="mt-2 flex flex-wrap gap-2">
//               {(recentSearchedCities || []).map((c) => (
//                 <span
//                   key={c}
//                   className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
//                 >
//                   {c}
//                 </span>
//               ))}
//               {(!recentSearchedCities || recentSearchedCities.length === 0) && (
//                 <div className="text-sm text-gray-600">No recent searches.</div>
//               )}
//             </div>

//             <div className="mt-4 grid sm:grid-cols-[1fr_auto] gap-3 items-end">
//               <label className="text-sm">
//                 <div className="text-gray-600 mb-1">Add recent search</div>
//                 <select
//                   className="w-full border rounded-xl px-3 py-2"
//                   value={recentSearchedCity}
//                   onChange={(e) => setRecentSearchedCity(e.target.value)}
//                 >
//                   <option value="">Select city</option>
//                   {cities.map((c) => (
//                     <option key={c} value={c}>
//                       {c}
//                     </option>
//                   ))}
//                 </select>
//               </label>

//               <button
//                 onClick={onSaveRecentSearch}
//                 disabled={saving}
//                 className="bg-black text-white rounded-full px-6 py-2.5 text-sm"
//               >
//                 {saving ? "Saving..." : "Save"}
//               </button>
//             </div>

//             {saveMessage && (
//               <div className="mt-3 text-sm text-gray-700">{saveMessage}</div>
//             )}
//           </div>
//         </div>
//       )}

//       <div className="mt-6 text-xs text-gray-500"></div>
//     </main>
//   );
// };

// export default UserProfilePage;
