import type { Post } from '$lib/types'

export async function load({ fetch }) {
	const response = await fetch('api/posts')
	console.log(5)
	const posts: Post[] = await response.json()
	console.log(6, posts)
	return { posts }
}
