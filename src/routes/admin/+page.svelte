<script lang="ts">
	import Activity from 'lucide-svelte/icons/activity';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import CreditCard from 'lucide-svelte/icons/credit-card';
	import DollarSign from 'lucide-svelte/icons/dollar-sign';
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';
	import Search from 'lucide-svelte/icons/search';
	import Users from 'lucide-svelte/icons/users';

	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import Header from './Header.svelte';
	import Stats from './Stats.svelte';
	import Bookings from './Bookings.svelte';
	import RecentSales from './RecentSales.svelte';
</script>

<div class="flex min-h-screen w-full flex-col">
	<Header />
	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
		<Stats />
		<div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
			<Bookings />
			<RecentSales />
		</div>
	</main>
</div>
