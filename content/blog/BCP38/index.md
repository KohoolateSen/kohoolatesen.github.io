+++
authors = ["Sadra"]
title = "BCP38, The Guardian Against IP Spoofing"
description = "How BCP38 acts as the frontline defense against IP spoofing, securing networks and mitigating DDoS attacks. (my very first blog post lol)"
date = 2025-05-16
[taxonomies]
tags = ["BCP38", "Networking", "Cybersecurity"]
[extra]
toc = true
toc_sidebar = false 
featured = true
+++

![Nature Image](https://res.cloudinary.com/dly5kd3h5/image/upload/v1747465704/nature-image_qr7ang.webp#end)

## What Is BCP38?

BCP38 (Best Current Practice 38), also known as **Ingress Filtering** and defined in **RFC 2827**, is a security standard designed to prevent **IP spoofing** at the network edge. By validating source IP addresses, it ensures only legitimate traffic enters or exits a network.

## Why BCP38 Matters

To understand BCP38's importance, we must first examine the risks posed by IP spoofing. While IP spoofing itself isn’t inherently malicious, it enables high-impact attacks such as:

- **DDoS Amplification Attacks**  
- **Anonymized Network Scans**  
- **Bypassing Access Controls**  

### Example: DDoS Amplification Attack  
Let’s break down how a DDoS amplification attack unfolds:  

**Attack Workflow**:  
- The attacker sends **crafted requests** to these open services, **spoofing the source IP address** to match the victim’s IP.  
- If BCP38 is **not enforced**, these spoofed packets reach the open services unchecked.  
- Each service responds to the victim’s IP, flooding it with traffic.  
- The victim’s resources are overwhelmed, leading to service downtime.  

BCP38 disrupts this chain by blocking spoofed packets at the source network’s edge.  

{% alert(note=true) %}
BCP38, Despite being published in 2000, many ISPs still neglect BCP38 implementation. This gap explains why spoofed traffic remains prevalent in large-scale attacks.
{% end %}

---

## How BCP38 Works

BCP38 enforces **ingress filtering** on edge router interfaces. It verifies whether incoming packets’ source IP addresses align with the network’s valid IP prefixes. Two primary implementation methods exist:

### 1. Unicast Reverse Path Forwarding (uRPF)

**uRPF** is the most efficient method for implementing BCP38 on Cisco devices. It cross-checks a packet’s source IP against the router’s routing table to validate legitimacy.  

**Modes of Operation**:  
- **Strict Mode**: Drops packets if the source IP isn’t reachable via the interface they arrived on. *Best for symmetric routing environments*.  
- **Loose Mode**: Only checks if the source IP exists in the routing table, regardless of the interface. *Useful for asymmetric routing (less secure)*.  

**Configuration Example**:  
Enable uRPF in strict mode on a Cisco interface:  
```cisco
interface GigabitEthernet0/0
ip verify unicast source reachable-via rx
```

- `rx` enables strict mode.
- For loose mode, replace `rx` with `any`:

```cisco
ip verify unicast source reachable-via any
```

### 2. Access Control Lists (ACLs)

ACLs provide an alternative method to implement BCP38
by filtering packets based on their source IP addresses.
This approach explicitly allows only packets with source
IPs from your network’s range and denies all others.
While less scalable than uRPF, it’s useful when uRPF
isn’t practical, such as in asymmetric routing scenarios.

**How it works ?**

- Define an ACL that permits packets with source IPs
matching your network’s range.
- Apply the ACL outbound on interfaces to ensure only
legitimate traffic exits.

**Configuration Example**:

Suppose your network uses the IP range <mark>192.168.32.0/24</mark>.
Configure an ACL like this:

```cisco
access-list 101 permit ip 192.168.32.0 0.0.0.255 any
access-list 101 deny ip any any

interface GigabitEthernet0/1
 ip access-group 101 out
```

- This allows only packets with source IPs in <mark>192.168.32.0/24</mark>
to leave the interface.

## Inability to Block In-Range Spoofed IP Addresses

BCP38 effectively filters out packets with source IP addresses that
fall outside the network’s legitimate range. However, it cannot prevent
spoofing of IP addresses within the allowed range. For example, an attacker
inside the network or one who spoofs an in-range IP 
(e.g., from a compromised device) can still send malicious packets 
through the gateway. This limitation means BCP38 offers no protection
against internal threats or attacks that exploit legitimate IP ranges,
requiring additional security measures to address such risks.

## Conlusion 

While BCP38 plays a crucial role in preventing such threats, it is not sufficient on its own. It represents just one of many measures and standards used to mitigate these types of attacks.
