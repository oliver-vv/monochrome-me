<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';

	export let session: any;
	export let logout: () => Promise<void>;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Avatar.Root>
			<Avatar.Fallback>{session?.user?.email?.slice(0, 1).toUpperCase()}</Avatar.Fallback>
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content sideOffset={15} class="w-40">
		<DropdownMenu.Group class="grid gap-1">
			<DropdownMenu.Label class="h-8">My Account</DropdownMenu.Label>
			<DropdownMenu.Item class="h-10">Profile</DropdownMenu.Item>
			<DropdownMenu.Item class="h-10">Settings</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item on:click={logout} class="h-10">Sign Out</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
