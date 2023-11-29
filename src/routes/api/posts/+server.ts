import { json } from '@sveltejs/kit'
import type { Post } from '$lib/types'

async function getPosts() {
	console.log(1)
	let posts: Post[] = []

	const paths = import.meta.glob('/src/posts/*.md', { eager: true })
	console.log(2)

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>
			const post = { ...metadata, slug } satisfies Post
			post.published && posts.push(post)
		}
	}
	console.log(3)

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	)
	console.log(4)

	return posts
}

export async function GET() {
	const posts = await getPosts()
	console.log(posts)
	return json(posts)
}
