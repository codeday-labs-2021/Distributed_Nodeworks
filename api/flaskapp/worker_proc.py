import asyncio

async def run_worker():
    code = 'rq worker'
    proc = await asyncio.create_subprocess_shell(code, stdout=asyncio.subprocess.PIPE)
    stdout = await proc.communicate()
    return stdout