import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import FeaturedPost from "../components/FeaturedPost";

const HomePage = () => {
	const [posts, setPosts] = useRecoilState(postsAtom);
	const [loading, setLoading] = useState(true);
	const showToast = useShowToast();
	useEffect(() => {
		const getFeedPosts = async () => {
			setLoading(true);
			setPosts([]);
			try {
				const res = await fetch("/api/posts/feed");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				console.log(data);
				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		getFeedPosts();
	}, [showToast, setPosts]);

	return (

		<div>

			<div className="">
				<div className="container mx-auto flex items-center py-12">
					<div className="w-1/2 pr-8">
						<h1 className="text-4xl font-bold mb-4">Delicious Feast for Family</h1>
						<p className="text-lg mb-6">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi provident itaque pariatur eaque ipsam suscipit. Soluta aliquam quaerat inventore fugit praesentium? Delectus, magni cum nostrum eos voluptatibus facilis esse harum libero consequuntur.</p>
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View Recipes</button>
					</div>
					<div className="w-1/2">
						<img src="/public/cover.jpg" alt="ChefSphere Image" className="w-full rounded-lg" />
					</div>
				</div>
			</div>

			<div className="px-6 py-4 mx-auto max-w-lg">
				<div className="flex items-center">
					<input type="text" className="border border-slate-400 w-full bg-gray-100 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search..." />
					<button className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 ml-2 rounded ">Search</button>
				</div>
			</div>

			<div className="flex items-center justify-between py-8">
				<h2 className="text-2xl font-semibold">Categories</h2>

				<button className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded">View All Categories</button>
			</div>

			<div className="grid grid-cols-4 gap-4">
				<div className="text-center">
					<img src="/public/meat.png" alt="Category 1" className="w-16 h-16 mx-auto mb-2" />
					<p className="text-sm">Meat</p>
				</div>

				<div className="text-center">
					<img src="/public/vegetable.png" alt="Category 2" className="w-16 h-16 mx-auto mb-2" />
					<p className="text-sm">Vegan</p>
				</div>

				<div className="text-center">
					<img src="/public/chocolate-bar.png" alt="Category 3" className="w-16 h-16 mx-auto mb-2" />
					<p className="text-sm">Chocolate</p>
				</div>

				<div className="text-center">
					<img src="/public/cake-slice.png" alt="Category 4" className="w-16 h-16 mx-auto mb-2" />
					<p className="text-sm">Cake</p>
				</div>
			</div>

			<div className="container mx-auto py-8">

				<div className="text-center">
					<h2 className="text-3xl font-semibold mb-4">Simple and Tasty Recipes</h2>
					<p className="text-lg mb-8">Discover delicious recipes that are easy to make and packed with flavor.</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{

					}
				</div>
			</div>

			<div className="container mx-auto py-8">

			

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">

				

					{!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>}

					{loading && (
						<div className="">
							<Spinner size='xl' />
						</div>
					)}

					{posts.map((post) => (
						<FeaturedPost key={post._id} post={post} postedBy={post.postedBy} />

					))}
				</div>


		
			</div>
			<footer className="text-center text-gray-600 text-sm mt-10">
				© 2024 ChefSphere. All rights reserved.
			</footer>
		</div>



	);
};

export default HomePage;
