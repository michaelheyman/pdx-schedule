import asyncio
import schedule


def lambda_entry(request):
    asyncio.get_event_loop().run_until_complete(schedule.run())


if __name__ == "__main__":
    schedule.main()
