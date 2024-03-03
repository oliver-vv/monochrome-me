<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import { Button } from '$lib/components/ui/button';
</script>

<main>
	<Accordion.Root class="grid gap-5 p-10">
		<h1 class="text-2xl font-bold">Frequently asked questions</h1>
		<p class="text-base">
			Can’t find the answer you’re looking for?
			<br /> Reach out to us through our <a href="contact" class="text-primary">Link</a> page.
		</p>
		<Accordion.Item value="item-1">
			<Accordion.Trigger class="text-base">How do I book a photo session slot?</Accordion.Trigger>
			<Accordion.Content>
				<p class="text-base text-gray-600">
					To book a slot, simply sign in to your account, select "Book now" from the landing page,
					select a room (Black Room or White Room), choose your preferred date and time, and confirm
					your booking. You will receive a confirmation email with your booking details shortly
					after.
				</p>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-2">
			<Accordion.Trigger class="text-base">Can I cancel or reschedule my booking?</Accordion.Trigger
			>
			<Accordion.Content>
				<p class="text-base text-gray-600">
					If, for any reason, you need to cancel or reschedule, you can do so free of charge until
					72 hours prior to your booked time slot. You have the option of receiving a voucher or
					refund. For cancelations less than 72 hours, bur more than 24 hours before your time slot,
					we will send you a voucher to be redeemed at any time. Unfortunately we cannot accept
					cancellations at less than 24 hours notice, but in that case perhaps you can make a good
					friend be very happy. :)
				</p>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-3">
			<Accordion.Trigger class="text-base"
				>What should I bring to my photo session?</Accordion.Trigger
			>
			<Accordion.Content>
				<p class="text-base text-gray-600">
					We will provide a few basic items for you sit or lean on, but we encourage you to bring
					some accessories or props to make your session more personal. If you have any questions
					about what to bring, feel free to contact us.
				</p>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-4">
			<Accordion.Trigger class="text-base">How long does a session last?</Accordion.Trigger>
			<Accordion.Content>
				<p class="text-base text-gray-600">
					After a short introduction and a few simple instructions, we will leave you alone with
					yourself for 45 minutes, during which you can take as many images as you feel like.
				</p>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-5">
			<Accordion.Trigger class="text-base">
				Are there any restrictions on how I can use my photos?</Accordion.Trigger
			>
			<Accordion.Content>
				<p class="text-base text-gray-600">
					All photos taken at "Monochrome Me" are yours to keep and use as you wish. Whether it's
					for personal use, social media, or professional portfolios, you have full rights to your
					images. We love seeing our clients' creativity, so feel free to tag us in your posts!
				</p>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-6">
			<Accordion.Trigger class="text-base">
				Is the "Monochrome Me" accessible for people with disabilities?</Accordion.Trigger
			>
			<Accordion.Content>
				<p class="text-base text-gray-600">
					Absolutely. Our studio is designed to be fully accessible to everyone. If you have
					specific accessibility needs, please contact us in advance so we can make the necessary
					arrangements to accommodate you.
				</p>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-7">
			<Accordion.Trigger class="text-base">
				How can I contact you for more information?</Accordion.Trigger
			>
			<Accordion.Content>
				<p class="text-base text-gray-600">
					If you have any questions or need further assistance, please don't hesitate to contact us
					through the "Contact Us" page on our website. You can also reach us by phone or email.
					We're here to help make your photo session a memorable experience!
				</p>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</main>
