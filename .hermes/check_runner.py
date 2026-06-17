import paramiko

host = "192.168.0.233"
username = "root"
password = "1234"

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(host, username=username, password=password, timeout=10)

def run(cmd):
    stdin, stdout, stderr = client.exec_command(cmd, timeout=30)
    exit_code = stdout.channel.recv_exit_status()
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    return {"exit": exit_code, "stdout": out, "stderr": err[:500]}

results = {}

# Runner service status
results["runner_status"] = run("systemctl status actions.runner.devrjs-oiko.server --no-pager -l 2>&1 | head -40")
results["runner_journal"] = run("journalctl -u actions.runner.devrjs-oiko.server --no-pager -n 50 2>&1")

# Runner directory
results["runner_dir"] = run("ls -la /root/actions-runner/")
results["runner_config"] = run("cat /root/actions-runner/.runner 2>/dev/null")
results["runner_service"] = run("cat /etc/systemd/system/actions.runner.devrjs-oiko.server.service 2>/dev/null")

# Check if runner process is alive
results["runner_process"] = run("ps aux | grep -i runner | grep -v grep")

# Check connectivity
results["dns_github"] = run("curl -s -o /dev/null -w '%{http_code}' --connect-timeout 5 https://api.github.com 2>&1 || echo 'FAIL'")
results["dns_github2"] = run("curl -s -o /dev/null -w '%{http_code}' --connect-timeout 5 https://github.com 2>&1 || echo 'FAIL'")

# Disk / memory
results["disk"] = run("df -h / && free -h")

# Check if the _work directory is intact
results["work_dir"] = run("ls -la /root/actions-runner/_work/")

# Check the runner logs directory
results["runner_logs"] = run("ls -la /root/actions-runner/_diag/ 2>/dev/null | tail -10")
results["runner_last_diag"] = run("cat /root/actions-runner/_diag/*.log 2>/dev/null | tail -50")

# Check if runner can reach GitHub
results["runner_connectivity"] = run("cat /root/actions-runner/.credentials 2>/dev/null")

client.close()

for k, v in results.items():
    print(f"\n=== {k} (exit={v['exit']}) ===")
    print(v['stdout'][:2000])
    if v['stderr']:
        print(f"STDERR: {v['stderr']}")
